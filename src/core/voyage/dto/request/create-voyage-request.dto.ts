import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber } from 'class-validator';

export class CreateVoyageRequestDto {
  @ApiProperty()
  @IsNumber()
  route_id: number;

  @ApiProperty()
  @IsNumber()
  train_id: number;

  @ApiProperty()
  @IsDate()
  start_date: Date;

  @ApiProperty()
  @IsNumber()
  ticket_cost: number;
}
