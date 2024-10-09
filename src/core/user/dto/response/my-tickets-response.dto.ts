import { ApiProperty } from '@nestjs/swagger';

export class MyTicketsResponseDto {
  @ApiProperty()
  start_date: Date;

  @ApiProperty()
  train_number: string;

  @ApiProperty()
  from: string;

  @ApiProperty()
  to: string;
}
