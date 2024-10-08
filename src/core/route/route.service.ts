import { Inject, Injectable } from '@nestjs/common';
import { RouteRepository } from './route.repository';
import { CreateRouteRequestDto } from './dto/request/create-route-request.dto';
import { EditRouteRequestDto } from './dto/request/edit-route-request.dto';
import { GetRoutesRequestDto } from './dto/request/get-routes-request.dto';
import { PageData } from '../../common/pagination/page.class';
import { PageMeta } from '../../common/pagination/page-meta.class';

@Injectable()
export class RouteService {
  constructor(
    @Inject(RouteRepository)
    private readonly repository: RouteRepository,
  ) {}

  async create(dto: CreateRouteRequestDto) {
    return this.repository.save(dto);
  }

  async edit(dto: EditRouteRequestDto) {
    return this.repository.save(dto);
  }

  async delete(id: number) {
    return this.repository.delete(id);
  }

  async getRoutes(dto: GetRoutesRequestDto) {
    const routes = await this.repository.getRoutesTable(dto);
    const count = await this.repository.getRoutesCount(dto);

    return new PageData(
      routes,
      new PageMeta({ pageOptions: dto, total: count }),
    );
  }

  async findOne(id: number) {
    return this.repository.findOne(id);
  }
}
