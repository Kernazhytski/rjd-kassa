import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RouteService } from './route.service';
import { CreateRouteRequestDto } from './dto/request/create-route-request.dto';
import {
  ApiExtraModels,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { AdminGuard } from '../../common/guards/admin.guard';
import { EditRouteRequestDto } from './dto/request/edit-route-request.dto';
import { GetRoutesRequestDto } from './dto/request/get-routes-request.dto';
import { GetRoutesResponseDto } from './dto/response/get-routes-response.dto';
import { ApiPaginatedResponse } from '../../common/pagination/page-swagger.decorator';
import { AuthGuard } from '../../common/guards/auth.guard';

@ApiTags('Route')
@ApiSecurity('bearer')
@ApiExtraModels(GetRoutesResponseDto)
@Controller('route')
export class RouteController {
  constructor(private readonly service: RouteService) {}

  @ApiOperation({
    summary: 'Создание маршрута (admin)',
  })
  @UseGuards(AdminGuard)
  @Post()
  async create(@Body() dto: CreateRouteRequestDto) {
    return this.service.create(dto);
  }

  @ApiOperation({
    summary: 'Редактирование маршрута (admin)',
  })
  @UseGuards(AdminGuard)
  @Put()
  async edit(@Body() dto: EditRouteRequestDto) {
    return this.service.edit(dto);
  }

  @ApiOperation({
    summary: 'Удаление маршрута (admin)',
  })
  @UseGuards(AdminGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.service.delete(id);
  }

  @ApiOperation({
    summary: 'Получение списка маршрутов',
  })
  @ApiPaginatedResponse(GetRoutesResponseDto)
  @UseGuards(AuthGuard)
  @Get('all')
  async getRoutes(@Query() dto: GetRoutesRequestDto) {
    return this.service.getRoutes(dto);
  }
}
