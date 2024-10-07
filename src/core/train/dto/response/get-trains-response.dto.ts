import { ApiProperty } from '@nestjs/swagger';

export class GetTrainsResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  number: string;

  @ApiProperty()
  model: string;

  @ApiProperty()
  passengers: number;

  @ApiProperty()
  train_type: string;

  @ApiProperty()
  train_type_id: number;
}
