import { ApiProperty } from '@nestjs/swagger';

export class GetRoutesResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  start: string;

  @ApiProperty()
  finish: string;

  @ApiProperty()
  travel_time: number;
}
