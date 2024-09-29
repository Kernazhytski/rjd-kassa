import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class ListDto {
  @ApiProperty({ description: 'id' })
  @IsInt()
  value: number;

  @ApiProperty()
  @IsString()
  label: string;
}
