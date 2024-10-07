import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Train } from './train.entity';
import { EntityManager, Repository } from 'typeorm';
import { GetTrainsRequestDto } from './dto/request/get-trains-request.dto';
import { FilterTrainTableDto } from './dto/filter-train-table.dto';

@Injectable()
export class TrainRepository {
  constructor(
    @InjectRepository(Train)
    private readonly repository: Repository<Train>,
  ) {}

  async save(data: Partial<Train>, manager?: EntityManager) {
    return manager ? manager.save(Train, data) : this.repository.save(data);
  }

  async findTrains(dto: GetTrainsRequestDto) {
    const query = this.repository
      .createQueryBuilder('train')
      .leftJoinAndSelect('train.train_type', 'train_type');

    if (dto.number) {
      query.andWhere('train.number = :number', { number: dto.number });
    }

    if (dto.type_id) {
      query.andWhere('train_type.id = :type_id', { type_id: dto.type_id });
    }

    if (dto.passengers_from) {
      query.andWhere('train.passengers >= :passengers_from', {
        passengers_from: dto.passengers_from,
      });
    }
    if (dto.passengers_to) {
      query.andWhere('train.passengers <= :passengers_to', {
        passengers_to: dto.passengers_to,
      });
    }

    if (dto.model) {
      query.andWhere('train.model = :model', { model: dto.model });
    }

    query
      .orderBy(dto.sortBy, dto.sortDirection.toUpperCase() as 'ASC' | 'DESC')
      .offset(dto.skip)
      .limit(dto.perPage);

    return query.getMany();
  }

  async totalTrains(dto: FilterTrainTableDto) {
    const query = this.repository
      .createQueryBuilder('train')
      .leftJoin('train.train_type', 'train_type');

    if (dto.number) {
      query.andWhere('train.number = :number', { number: dto.number });
    }

    if (dto.type_id) {
      query.andWhere('train_type.id = :type_id', { type_id: dto.type_id });
    }

    if (dto.passengers_from) {
      query.andWhere('train.passengers >= :passengers_from', {
        passengers_from: dto.passengers_from,
      });
    }
    if (dto.passengers_to) {
      query.andWhere('train.passengers <= :passengers_to', {
        passengers_to: dto.passengers_to,
      });
    }

    if (dto.model) {
      query.andWhere('train.model = :model', { model: dto.model });
    }

    return query.getCount();
  }

  async delete(id: number) {
    return this.repository.delete(id);
  }
}
