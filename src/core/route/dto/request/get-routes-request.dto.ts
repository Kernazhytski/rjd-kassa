import { PageOptionsDto } from '../../../../common/pagination/page-meta-options.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { SortDirectionList } from '../../../../common/sort/sort-direction-list';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { SortFieldRouteType } from '../../type/sort-field-route.type';

export class GetRoutesRequestDto extends PageOptionsDto {
  @ApiPropertyOptional({
    enum: SortFieldRouteType,
  })
  @IsEnum(SortFieldRouteType)
  @IsOptional()
  sortBy: SortFieldRouteType = SortFieldRouteType.id;

  @ApiPropertyOptional({
    enum: SortDirectionList,
  })
  @IsEnum(SortDirectionList)
  @IsOptional()
  sortDirection: SortDirectionList = SortDirectionList.desc;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  start: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  finish: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  travel_time_from: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  travel_time_to: number;
}
