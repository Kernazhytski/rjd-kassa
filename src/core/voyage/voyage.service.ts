import { Inject, Injectable } from '@nestjs/common';
import { VoyageRepository } from './voyage.repository';
import { CreateVoyageRequestDto } from './dto/create-voyage-request.dto';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { RouteService } from 'core/route/route.service';

@Injectable()
export class VoyageService {
  constructor(
    @Inject(VoyageRepository)
    private readonly repository: VoyageRepository,
    @InjectDataSource()
    private readonly dataSource: DataSource,
    private readonly routeService: RouteService,
  ) {}

  async create(dto: CreateVoyageRequestDto) {
    const route = await this.routeService.findOne(dto.route_id);

    return this.dataSource.transaction(async (manager) => {
      await this.repository.save(
        {
          ...dto,
          is_start: true,
        },
        manager,
      );

      const end_travel_date = new Date(dto.start_date);
      end_travel_date.setMinutes(
        end_travel_date.getMinutes() + 30 + route.travel_time,
      );

      await this.repository.save(
        {
          train_id: dto.train_id,
          route_id: dto.route_id,
          start_date: end_travel_date,
          is_start: false,
        },
        manager,
      );
    });
  }
}
