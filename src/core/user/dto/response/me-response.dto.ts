import { ApiProperty } from '@nestjs/swagger';

export class MeResponseDto {
  @ApiProperty()
  passport_num: string;

  @ApiProperty()
  surname: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  patronymic: string;
}
