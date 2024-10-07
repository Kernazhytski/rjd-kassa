import { CreateRouteRequestDto } from './create-route-request.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class EditRouteRequestDto extends CreateRouteRequestDto {
  @ApiProperty()
  @IsNumber()
  id: number;
}
