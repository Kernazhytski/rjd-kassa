import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrainType } from './train-type.entity';
import { Repository } from 'typeorm';
import { TrainTypesResponseDto } from './dto/response/train-types-response.dto';

@Injectable()
export class TrainTypeService {
  constructor(
    @InjectRepository(TrainType)
    private readonly repository: Repository<TrainType>,
  ) {}

  async getTypes(): Promise<TrainTypesResponseDto> {
    const types = await this.repository.find();
    return {
      types,
    };
  }
}
