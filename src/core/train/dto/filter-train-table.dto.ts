import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class FilterTrainTableDto {
  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  type_id: number;

  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  passengers_from: number;

  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  passengers_to: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  number: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  model: string;
}
