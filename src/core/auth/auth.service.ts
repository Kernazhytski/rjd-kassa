import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { RegisterRequestDto } from './dto/request/register-request.dto';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { LogicException } from '../../exceptions/logic-exception';
import { LogicExceptionList } from '../../exceptions/types/logic-exceptions.enum';
import * as crypto from 'crypto';
import { AppConfig } from '../../configs';
import { ConfigService } from '@nestjs/config';
import { UserToRoleService } from '../user_to_role/user_to_role.service';
import { RoleIdsType } from '../role/types/role-ids.type';
import { TokenResponseDto } from './dto/response/token-response.dto';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    @InjectDataSource()
    private readonly dataSource: DataSource,
    private readonly configService: ConfigService,
    private readonly userToRoleService: UserToRoleService,
    private readonly cls: ClsService,
  ) {
    const appConfig = configService.get<AppConfig>('app');

    this.key = Buffer.from(appConfig.cryptoKey, 'base64');
    this.iv = Buffer.from(appConfig.cryptoIV, 'hex');
  }

  private readonly algorithm = 'aes-256-cbc'; // Алгоритм шифрования
  private readonly key: Buffer; // Генерация 32-байтного ключа
  private readonly iv: Buffer; // Инициализационный вектор

  async register(data: RegisterRequestDto): Promise<TokenResponseDto> {
    const loginExist = await this.userService.checkUserExistByOption({
      login: data.login,
    });
    if (loginExist) {
      throw new LogicException(LogicExceptionList.LoginExist);
    }

    this.cls.set('metaMessage', 'Успешно зарегистрировано');
    return this.dataSource.transaction(async (manager) => {
      const user = await this.userService.create(
        {
          login: data.login,
          password: this.encrypt(data.password),
        },
        manager,
      );

      await this.userToRoleService.save(
        {
          user_id: user.id,
          role_id: RoleIdsType.User,
        },
        manager,
      );

      return {
        token: await this.generateToken(user.id, [RoleIdsType.User]),
      };
    });
  }

  async login(data: RegisterRequestDto): Promise<TokenResponseDto> {
    const user = await this.userService.findUserByLogin({
      login: data.login,
    });
    if (!user) {
      throw new LogicException(LogicExceptionList.UserNotExist);
    }

    const password = this.decrypt(user.password);
    if (password !== data.password) {
      throw new LogicException(LogicExceptionList.PasswordDontMatch);
    }

    this.cls.set('metaMessage', 'Успешно авторизовано');
    return {
      token: await this.generateToken(
        user.id,
        user.user_to_roles.map((u2r) => u2r.role.id),
      ),
    };
  }

  async generateToken(userId: string, roles: number[]) {
    const payload = { userId, roles };
    return this.jwtService.signAsync(payload);
  }

  // Метод для шифрования
  encrypt(password: string): string {
    const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
    let encrypted = cipher.update(password, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${encrypted}:${this.iv.toString('hex')}`;
  }

  // Метод для дешифрования
  decrypt(encrypted: string): string {
    const [encryptedText, iv] = encrypted.split(':');
    const decipher = crypto.createDecipheriv(
      this.algorithm,
      this.key,
      Buffer.from(iv, 'hex'),
    );
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}
