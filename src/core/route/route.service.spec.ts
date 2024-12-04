import { Test, TestingModule } from '@nestjs/testing';
import { RouteService } from './route.service';
import { RouteRepository } from './route.repository';
import { CreateRouteRequestDto } from './dto/request/create-route-request.dto';
import { EditRouteRequestDto } from './dto/request/edit-route-request.dto';
import { GetRoutesRequestDto } from './dto/request/get-routes-request.dto';
import { PageData } from '../../common/pagination/page.class';
import { PageMeta } from '../../common/pagination/page-meta.class';
import { SortFieldRouteType } from './type/sort-field-route.type';
import { SortDirectionList } from '../../common/sort/sort-direction-list';

describe('RouteService', () => {
  let service: RouteService;
  let repository: RouteRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RouteService,
        {
          provide: RouteRepository,
          useValue: {
            save: jest.fn(),
            delete: jest.fn(),
            getRoutesTable: jest.fn(),
            getRoutesCount: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RouteService>(RouteService);
    repository = module.get<RouteRepository>(RouteRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should call repository.save with correct data', async () => {
      const dto: CreateRouteRequestDto = {
        start: 'City A',
        finish: 'City B',
        travel_time: 120,
      };

      jest.spyOn(repository, 'save').mockResolvedValue({ id: 1, ...dto });

      const result = await service.create(dto);

      expect(repository.save).toHaveBeenCalledWith(dto);
      expect(result).toEqual({ id: 1, ...dto });
    });
  });

  describe('edit', () => {
    it('should call repository.save with correct data', async () => {
      const dto: EditRouteRequestDto = {
        id: 1,
        start: 'City A',
        finish: 'City B',
        travel_time: 150,
      };

      jest.spyOn(repository, 'save').mockResolvedValue(dto);

      const result = await service.edit(dto);

      expect(repository.save).toHaveBeenCalledWith(dto);
      expect(result).toEqual(dto);
    });
  });

  describe('delete', () => {
    it('should call repository.delete with correct id', async () => {
      const id = 1;

      jest
        .spyOn(repository, 'delete')
        .mockResolvedValue({ affected: 1, raw: [] });

      const result = await service.delete(id);

      expect(repository.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual({ affected: 1, raw: [] });
    });
  });

  describe('getRoutes', () => {
    it('should return paginated routes data', async () => {
      const dto: GetRoutesRequestDto = {
        page: 1,
        perPage: 10,
        get skip(): number {
          return (this.page - 1) * this.perPage;
        },
        sortBy: SortFieldRouteType.id,
        sortDirection: SortDirectionList.desc,
        start: 'City A',
        finish: 'City B',
        travel_time_from: 100,
        travel_time_to: 200,
      };

      const mockRoutes = [
        { id: 1, start: 'City A', finish: 'City B', travel_time: 120 },
      ];

      jest.spyOn(repository, 'getRoutesTable').mockResolvedValue(mockRoutes);
      jest.spyOn(repository, 'getRoutesCount').mockResolvedValue(1);

      const result = await service.getRoutes(dto);

      expect(repository.getRoutesTable).toHaveBeenCalledWith(dto);
      expect(repository.getRoutesCount).toHaveBeenCalledWith(dto);
      expect(result).toEqual(
        new PageData(mockRoutes, new PageMeta({ pageOptions: dto, total: 1 })),
      );
    });
  });

  describe('findOne', () => {
    it('should call repository.findOne with correct id', async () => {
      const id = 1;
      const mockRoute = {
        id,
        start: 'City A',
        finish: 'City B',
        travel_time: 120,
      };

      jest.spyOn(repository, 'findOne').mockResolvedValue(mockRoute);

      const result = await service.findOne(id);

      expect(repository.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockRoute);
    });
  });
});
