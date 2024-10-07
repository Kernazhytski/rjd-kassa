import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateRouteRequestDto {
  @ApiProperty()
  @IsString()
  start: string;

  @ApiProperty()
  @IsString()
  finish: string;

  @ApiProperty()
  @IsNumber()
  travel_time: number;
}
