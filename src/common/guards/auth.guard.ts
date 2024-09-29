import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { LogicException } from 'exceptions/logic-exception';
import { LogicExceptionList } from 'exceptions/types/logic-exceptions.enum';
import { JwtService } from '@nestjs/jwt';
import { ClsService } from 'nestjs-cls';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly cls: ClsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new LogicException(LogicExceptionList.UnauthorizedAccess);
    }

    try {
      await this.jwtService.verifyAsync(token);

      const decodedToken = this.jwtService.decode(token);
      this.cls.set('userId', decodedToken.userId);
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
