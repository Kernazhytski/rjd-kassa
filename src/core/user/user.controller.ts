import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../../common/guards/auth.guard';
import { ApiResponseCustom } from '../../common/decorators/api-response.decorator';
import { MeResponseDto } from './dto/response/me-response.dto';
import {
  ApiExtraModels,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { MyTicketsRequestDto } from './dto/request/my-tickets-request.dto';
import { ApiPaginatedResponse } from '../../common/pagination/page-swagger.decorator';
import { MyTicketsResponseDto } from './dto/response/my-tickets-response.dto';

@ApiTags('User')
@ApiExtraModels(MeResponseDto)
@ApiExtraModels(MyTicketsResponseDto)
@ApiSecurity('bearer')
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get('me')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get current user' })
  @ApiResponseCustom(200, MeResponseDto)
  async me() {
    return this.service.me();
  }

  @Get('my-tickets')
  @UseGuards(AuthGuard)
  @ApiPaginatedResponse(MyTicketsResponseDto)
  @ApiOperation({ summary: 'Get current user tickets' })
  async myTickets(@Query() dto: MyTicketsRequestDto) {
    return this.service.myTickets(dto);
  }
}
