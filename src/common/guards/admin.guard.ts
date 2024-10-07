import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { LogicException } from 'exceptions/logic-exception';
import { LogicExceptionList } from 'exceptions/types/logic-exceptions.enum';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { RoleIdsType } from '../../core/role/types/role-ids.type';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new LogicException(LogicExceptionList.UnauthorizedAccess);
    }

    try {
      await this.jwtService.verifyAsync(token);

      const decodedToken = this.jwtService.decode(token);
      if (!decodedToken.roles.includes(RoleIdsType.Admin)) {
        throw new LogicException(LogicExceptionList.UnauthorizedAccess);
      }
    } catch (e) {
      throw new LogicException(LogicExceptionList.UnauthorizedAccess);
    }

    return true;
  }

  protected extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
