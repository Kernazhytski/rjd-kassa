import { PageOptionsDto } from '../../../../common/pagination/page-meta-options.dto';
import { VoyageTableSortType } from '../../type/voyage-table-sort.type';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { SortDirectionList } from '../../../../common/sort/sort-direction-list';

export class GetVoyagesRequestDto extends PageOptionsDto {
  @ApiPropertyOptional({
    enum: VoyageTableSortType,
  })
  @IsEnum(VoyageTableSortType)
  @IsOptional()
  sortBy: VoyageTableSortType = VoyageTableSortType.id;

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
  @IsDate()
  @IsOptional()
  date: Date;
}
