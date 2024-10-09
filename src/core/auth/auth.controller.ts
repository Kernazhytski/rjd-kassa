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
import { ApiException } from '../../common/decorators/api-exception.decorator';
import { LogicExceptionList } from '../../exceptions/types/logic-exceptions.enum';

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
  @ApiException([
    LogicExceptionList.UserNotExist,
    LogicExceptionList.PasswordDontMatch,
  ])
  @ApiResponseCustom(200, TokenResponseDto)
  async login(@Body() dto: RegisterRequestDto) {
    return this.service.login(dto);
  }

  @ApiOperation({
    description: 'Register',
  })
  @Post('register')
  @ApiException([LogicExceptionList.LoginExist])
  @ApiResponseCustom(200, TokenResponseDto)
  async register(@Body() dto: RegisterRequestDto) {
    return this.service.register(dto);
  }
}
