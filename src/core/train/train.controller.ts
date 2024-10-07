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
import { TrainService } from './train.service';
import { CreateTrainRequestDto } from './dto/request/create-train-request.dto';
import {
  ApiExtraModels,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { AdminGuard } from '../../common/guards/admin.guard';
import { GetTrainsRequestDto } from './dto/request/get-trains-request.dto';
import { EditTrainRequestDto } from './dto/request/edit-train-request.dto';
import { GetTrainsResponseDto } from './dto/response/get-trains-response.dto';
import { ApiPaginatedResponse } from '../../common/pagination/page-swagger.decorator';

@ApiTags('Train')
@ApiSecurity('bearer')
@ApiExtraModels(GetTrainsResponseDto)
@Controller('train')
export class TrainController {
  constructor(private readonly service: TrainService) {}

  @ApiOperation({
    summary: 'Create train',
  })
  @Post('')
  @UseGuards(AdminGuard)
  async createTrain(@Body() dto: CreateTrainRequestDto) {
    return this.service.create(dto);
  }

  @ApiOperation({
    summary: 'Get all trains',
  })
  @Get('all')
  @ApiPaginatedResponse(GetTrainsResponseDto)
  @UseGuards(AdminGuard)
  async getTrains(@Query() dto: GetTrainsRequestDto) {
    return this.service.getTrains(dto);
  }

  @ApiOperation({
    summary: 'Edit train',
  })
  @UseGuards(AdminGuard)
  @Put('')
  async editTrain(@Body() dto: EditTrainRequestDto) {
    return this.service.editTrain(dto);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    return this.service.delete(id);
  }
}
