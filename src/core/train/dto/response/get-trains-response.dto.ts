import { ApiProperty } from '@nestjs/swagger';
import {
  TrainTypes,
  TrainTypesResponseDto,
} from '../../../nsi/train-type/dto/response/train-types-response.dto';

export class GetTrainsResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  number: string;

  @ApiProperty()
  model: string;

  @ApiProperty()
  passengers: number;

  @ApiProperty({
    type: TrainTypes,
  })
  train_type: TrainTypes;
}
