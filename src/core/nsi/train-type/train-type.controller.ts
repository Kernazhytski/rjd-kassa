import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { TrainTypeService } from './train-type.service';
import { TrainTypesResponseDto } from './dto/response/train-types-response.dto';
import { AuthGuard } from '../../../common/guards/auth.guard';
import { ApiResponseCustom } from '../../../common/decorators/api-response.decorator';

@ApiTags('Train')
@ApiSecurity('bearer')
@ApiExtraModels(TrainTypesResponseDto)
@Controller('train/type')
export class TrainTypeController {
  constructor(private readonly service: TrainTypeService) {}

  @ApiOperation({
    summary: 'Get train types',
  })
  @UseGuards(AuthGuard)
  @ApiResponseCustom(200, TrainTypesResponseDto)
  @Get('')
  async getTypes() {
    return this.service.getTypes();
  }
}
