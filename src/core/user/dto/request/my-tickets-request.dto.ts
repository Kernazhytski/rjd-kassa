import { PageOptionsDto } from '../../../../common/pagination/page-meta-options.dto';
import { MyTicketsSortType } from '../../type/my-tickets-sort.type';
import { SortDirectionList } from '../../../../common/sort/sort-direction-list';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export class MyTicketsRequestDto extends PageOptionsDto {
  @ApiPropertyOptional({
    enum: MyTicketsSortType,
  })
  @IsEnum(MyTicketsSortType)
  @IsOptional()
  sortBy: MyTicketsSortType;

  @ApiPropertyOptional({
    enum: SortDirectionList,
  })
  @IsEnum(SortDirectionList)
  @IsOptional()
  sortDirection: SortDirectionList = SortDirectionList.asc;
}
