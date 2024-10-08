import { Injectable } from '@nestjs/common';
import { Voyage } from './voyage.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GetVoyagesRequestDto } from './dto/request/get-vouages-request.dto';
import { VoyageTableSortType } from './type/voyage-table-sort.type';

@Injectable()
export class VoyageRepository {
  constructor(
    @InjectRepository(Voyage)
    private readonly repository: Repository<Voyage>,
  ) {}

  async save(data: Partial<Voyage>, manager?: EntityManager) {
    return manager ? manager.save(Voyage, data) : this.repository.save(data);
  }

  async delete(id: number) {
    return this.repository.delete(id);
  }

  async getVoyagesTable(dto: GetVoyagesRequestDto) {
    const query = this.repository
      .createQueryBuilder('voyage')
      .leftJoinAndSelect('voyage.route', 'route')
      .leftJoinAndSelect('voyage.train', 'train')
      .leftJoinAndSelect('train.train_type', 'train_type')
      .leftJoinAndSelect('voyage.tickets', 'ticket');

    if (dto.start) {
      query.where(
        '((route.start = :start AND voyage.is_start = true) OR (route.finish = :start AND voyage.is_start = false))',
        {
          start: dto.start,
        },
      );
    }
    if (dto.finish) {
      query.where(
        '((route.start = :finish AND voyage.is_start = false) OR (route.finish = :finish AND voyage.is_start = true))',
        {
          finish: dto.finish,
        },
      );
    }
    if (dto.date) {
      query.where('voyage.start_date = :date', {
        date: dto.date,
      });
    }
    const sort = this.getSorField(dto);

    return query.orderBy(sort).skip(dto.skip).take(dto.perPage).getMany();
  }

  async getVoyagesCount(dto: GetVoyagesRequestDto) {
    const query = this.repository
      .createQueryBuilder('voyage')
      .leftJoinAndSelect('voyage.route', 'route')
      .leftJoinAndSelect('voyage.train', 'train')
      .leftJoinAndSelect('voyage.tickets', 'ticket');

    if (dto.start) {
      query.where(
        '((route.start = :start AND voyage.is_start = true) OR (route.finish = :start AND voyage.is_start = false))',
        {
          start: dto.start,
        },
      );
    }
    if (dto.finish) {
      query.where(
        '((route.start = :finish AND voyage.is_start = false) OR (route.finish = :finish AND voyage.is_start = true))',
        {
          finish: dto.finish,
        },
      );
    }
    if (dto.date) {
      query.where('voyage.start_date = :date', {
        date: dto.date,
      });
    }

    return query.getCount();
  }

  private getSorField(dto: GetVoyagesRequestDto) {
    switch (dto.sortBy) {
      case VoyageTableSortType.id:
        return {
          ['voyage.id']: dto.sortDirection.toUpperCase() as 'ASC' | 'DESC',
        };
      case VoyageTableSortType.ticket_cost:
        return {
          ['voyage.ticket_cost']: dto.sortDirection.toUpperCase() as
            | 'ASC'
            | 'DESC',
        };
      case VoyageTableSortType.travel_time:
        return {
          ['route.travel_time']: dto.sortDirection.toUpperCase() as
            | 'ASC'
            | 'DESC',
        };
    }
  }
}
