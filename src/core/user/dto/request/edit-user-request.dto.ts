import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class EditUserRequestDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  surname: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  patronymic: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  passport_num: string;
}
