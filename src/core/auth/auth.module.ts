import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfig } from '../../configs';
import { UserModule } from '../user/user.module';
import { UserToRoleModule } from '../user_to_role/user_to_role.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory(configService: ConfigService) {
        const appConfig = configService.get<AppConfig>('app');

        return {
          global: true,
          signOptions: {
            algorithm: 'RS512',
          },
          publicKey: appConfig.jwtPublicKey,
          privateKey: appConfig.jwtPrivateKey,
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
    ConfigModule,
    UserToRoleModule,
  ],
  exports: [JwtModule],
})
export class AuthModule {}
