import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateTicketRequestDto {
  @ApiProperty()
  @IsNumber()
  voyage_id: number;
}
