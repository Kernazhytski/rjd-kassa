import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@ApiSecurity('bearer')
@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @ApiOperation({
    description: 'Login',
  })
  @Post('login')
  async login() {
    return this.service.login();
  }
}
