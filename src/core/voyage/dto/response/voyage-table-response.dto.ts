import { ApiProperty } from '@nestjs/swagger';

class TrainResp {
  @ApiProperty()
  id: number;

  @ApiProperty()
  number: string;

  @ApiProperty()
  model: string;

  @ApiProperty()
  train_type: string;
}

export class VoyageTableResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  start_date: Date;

  @ApiProperty()
  train: TrainResp;

  @ApiProperty()
  from: string;

  @ApiProperty()
  to: string;

  @ApiProperty()
  ticket_cost: number;

  @ApiProperty()
  tickets_left: number;

  @ApiProperty()
  route_id: number;
}
