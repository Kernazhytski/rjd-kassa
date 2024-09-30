import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiExtraModels,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { RegisterRequestDto } from './dto/request/register-request.dto';
import { TokenResponseDto } from './dto/response/token-response.dto';
import { ApiResponseCustom } from '../../common/decorators/api-response.decorator';

@ApiTags('Auth')
@ApiSecurity('bearer')
@ApiExtraModels(TokenResponseDto)
@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @ApiOperation({
    description: 'Login',
  })
  @Post('login')
  @ApiResponseCustom(200, TokenResponseDto)
  async login(@Body() dto: RegisterRequestDto) {
    return this.service.login(dto);
  }

  @ApiOperation({
    description: 'Register',
  })
  @Post('register')
  @ApiResponseCustom(200, TokenResponseDto)
  async register(@Body() dto: RegisterRequestDto) {
    return this.service.register(dto);
  }
}
