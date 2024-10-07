import { ApiProperty } from '@nestjs/swagger';

export class TrainTypes {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}

export class TrainTypesResponseDto {
  @ApiProperty({
    type: [TrainTypes],
  })
  types: TrainTypes[];
}
