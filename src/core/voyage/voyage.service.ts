import { Inject, Injectable } from '@nestjs/common';
import { VoyageRepository } from './voyage.repository';
import { CreateVoyageRequestDto } from './dto/request/create-voyage-request.dto';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { RouteService } from 'core/route/route.service';
import { EditVoyageRequestDto } from './dto/request/edit-voyage-request.dto';
import { GetVoyagesRequestDto } from './dto/request/get-vouages-request.dto';
import { PageMeta } from '../../common/pagination/page-meta.class';
import { PageData } from '../../common/pagination/page.class';

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
          ticket_cost: dto.ticket_cost,
          start_date: end_travel_date,
          is_start: false,
        },
        manager,
      );
    });
  }

  async edit(dto: EditVoyageRequestDto) {
    return this.repository.save(dto);
  }

  async delete(id: number) {
    return this.repository.delete(id);
  }

  async getVoyages(dto: GetVoyagesRequestDto) {
    const voyages = await this.repository.getVoyagesTable(dto);
    const voyagesCount = await this.repository.getVoyagesCount(dto);

    return new PageData(
      voyages.map((vouyage) => {
        return {
          id: vouyage?.id,
          start_date: vouyage?.start_date,
          train: {
            id: vouyage?.train?.id,
            number: vouyage?.train?.number,
            model: vouyage?.train?.model,
            train_type: vouyage?.train?.train_type?.name,
          },
          from: vouyage.is_start
            ? vouyage?.route?.start
            : vouyage?.route?.finish,
          to: vouyage.is_start ? vouyage?.route?.finish : vouyage?.route?.start,
          ticket_cost: vouyage?.ticket_cost,
          tickets_left: vouyage?.train?.passengers - vouyage?.tickets?.length,
          route_id: vouyage?.route?.id,
        };
      }),
      new PageMeta({
        total: voyagesCount,
        pageOptions: dto,
      }),
    );
  }
}
