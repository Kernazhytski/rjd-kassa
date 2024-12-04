import { InjectRepository } from '@nestjs/typeorm';
import { Route } from './route.entity';
import { EntityManager, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { GetRoutesRequestDto } from './dto/request/get-routes-request.dto';

@Injectable()
export class RouteRepository {
  constructor(
    @InjectRepository(Route)
    private readonly repository: Repository<Route>,
  ) {}

  async save(
    data: Partial<Route>,
    manager?: EntityManager,
  ): Promise<Partial<Route>> {
    return manager ? manager.save(Route, data) : this.repository.save(data);
  }

  async delete(id: number) {
    return this.repository.delete(id);
  }

  async getRoutesTable(dto: GetRoutesRequestDto) {
    const query = this.repository
      .createQueryBuilder('route')
      .select([
        'route.id as id',
        'route.start as start',
        'route.finish as finish',
        'route.travel_time as travel_time',
      ]);

    if (dto.start) {
      query.andWhere('route.start = :start', { start: dto.start });
    }

    if (dto.finish) {
      query.andWhere('route.finish = :finish', { finish: dto.finish });
    }

    if (dto.travel_time_from) {
      query.andWhere('route.travel_time >= :travel_time_from', {
        travel_time_from: dto.travel_time_from,
      });
    }

    if (dto.travel_time_to) {
      query.andWhere('route.travel_time <= :travel_time_to', {
        travel_time_to: dto.travel_time_to,
      });
    }

    return query
      .orderBy(dto.sortBy, dto.sortDirection.toUpperCase() as 'ASC' | 'DESC')
      .offset(dto.skip)
      .limit(dto.perPage)
      .getRawMany();
  }

  async getRoutesCount(dto: GetRoutesRequestDto) {
    const query = this.repository.createQueryBuilder('route');

    if (dto.start) {
      query.andWhere('route.start = :start', { start: dto.start });
    }

    if (dto.finish) {
      query.andWhere('route.finish = :finish', { finish: dto.finish });
    }

    if (dto.travel_time_from) {
      query.andWhere('route.travel_time >= :travel_time_from', {
        travel_time_from: dto.travel_time_from,
      });
    }

    if (dto.travel_time_to) {
      query.andWhere('route.travel_time <= :travel_time_to', {
        travel_time_to: dto.travel_time_to,
      });
    }

    return query.getCount();
  }

  async findOne(id: number): Promise<Partial<Route>> {
    return this.repository.findOne({ where: { id } });
  }
}
