import { CreateTrainRequestDto } from './create-train-request.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class EditTrainRequestDto extends CreateTrainRequestDto {
  @ApiProperty()
  @IsNumber()
  id: number;
}
