import { PageOptionsDto } from '../../../../common/pagination/page-meta-options.dto';
import { SortDirectionList } from '../../../../common/sort/sort-direction-list';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { TrainSortFields } from '../../type/train-sort-fields';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

export class GetTrainsRequestDto extends PageOptionsDto {
  @ApiPropertyOptional({
    enum: TrainSortFields,
  })
  @IsEnum(TrainSortFields)
  @IsOptional()
  sortBy: TrainSortFields = TrainSortFields.id;

  @ApiPropertyOptional({
    enum: SortDirectionList,
  })
  @IsEnum(SortDirectionList)
  @IsOptional()
  sortDirection: SortDirectionList = SortDirectionList.desc;

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
