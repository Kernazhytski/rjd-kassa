import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsNumber } from 'class-validator';

export class CreateVoyageRequestDto {
  @ApiProperty()
  @IsNumber()
  route_id: number;

  @ApiProperty()
  @IsNumber()
  train_id: number;

  @ApiProperty()
  @IsISO8601()
  start_date: Date;
}
