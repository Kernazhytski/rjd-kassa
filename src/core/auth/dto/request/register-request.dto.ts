import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RegisterRequestDto {
  @ApiProperty({
    example: 'test',
  })
  @IsString()
  login: string;

  @ApiProperty({
    example: '123',
  })
  @IsString()
  password: string;
}
