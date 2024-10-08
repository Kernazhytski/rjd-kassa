import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { CreateVoyageRequestDto } from './create-voyage-request.dto';

export class EditVoyageRequestDto extends CreateVoyageRequestDto {
  @ApiProperty()
  @IsNumber()
  id: number;
}
