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
import { VoyageService } from './voyage.service';
import { CreateVoyageRequestDto } from './dto/request/create-voyage-request.dto';
import {
  ApiExtraModels,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { AdminGuard } from '../../common/guards/admin.guard';
import { EditVoyageRequestDto } from './dto/request/edit-voyage-request.dto';
import { GetVoyagesRequestDto } from './dto/request/get-vouages-request.dto';
import { AuthGuard } from '../../common/guards/auth.guard';
import { ApiPaginatedResponse } from '../../common/pagination/page-swagger.decorator';
import { VoyageTableResponseDto } from './dto/response/voyage-table-response.dto';

@ApiTags('Voyage')
@ApiSecurity('bearer')
@Controller('voyage')
@ApiExtraModels(VoyageTableResponseDto)
export class VoyageController {
  constructor(private readonly service: VoyageService) {}

  @ApiOperation({ summary: 'Create voyage' })
  @UseGuards(AdminGuard)
  @Post()
  async create(@Body() dto: CreateVoyageRequestDto) {
    return this.service.create(dto);
  }

  @ApiOperation({ summary: 'Edit voyage' })
  @UseGuards(AdminGuard)
  @Put()
  async edit(@Body() dto: EditVoyageRequestDto) {
    return this.service.edit(dto);
  }

  @ApiOperation({ summary: 'Delete voyage' })
  @UseGuards(AdminGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.service.delete(id);
  }

  @ApiOperation({ summary: 'Get voyages' })
  @ApiPaginatedResponse(VoyageTableResponseDto)
  @UseGuards(AuthGuard)
  @Get('all')
  async getTable(@Query() dto: GetVoyagesRequestDto) {
    return this.service.getVoyages(dto);
  }
}
