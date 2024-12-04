import { Test, TestingModule } from '@nestjs/testing';
import { TrainService } from './train.service';
import { TrainRepository } from './train.repository';
import { CreateTrainRequestDto } from './dto/request/create-train-request.dto';
import { GetTrainsRequestDto } from './dto/request/get-trains-request.dto';
import { EditTrainRequestDto } from './dto/request/edit-train-request.dto';
import { PageData } from '../../common/pagination/page.class';
import { PageMeta } from '../../common/pagination/page-meta.class';
import { TrainSortFields } from './type/train-sort-fields';
import { SortDirectionList } from '../../common/sort/sort-direction-list';

describe('TrainService', () => {
  let service: TrainService;
  let repository: TrainRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrainService,
        {
          provide: TrainRepository,
          useValue: {
            save: jest.fn(),
            findTrains: jest.fn(),
            totalTrains: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TrainService>(TrainService);
    repository = module.get<TrainRepository>(TrainRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should call trainRepository.save with correct data', async () => {
      const dto: CreateTrainRequestDto = {
        number: '123A',
        model: 'Model X',
        passengers: 100,
        train_type_id: 1,
      };

      jest.spyOn(repository, 'save').mockResolvedValue({
        id: 1,
        ...dto,
      });

      const result = await service.create(dto);

      expect(repository.save).toHaveBeenCalledWith(dto);
      expect(result).toEqual({ id: 1, ...dto });
    });
  });

  describe('getTrains', () => {
    it('should return paginated train data', async () => {
      const dto: GetTrainsRequestDto = {
        page: 1,
        perPage: 10,
        get skip(): number {
          return (this.page - 1) * this.perPage;
        },
        sortBy: TrainSortFields.id,
        sortDirection: SortDirectionList.desc,
        number: '123A',
        passengers_from: 50,
        passengers_to: 200,
        type_id: 1,
        model: 'Model X',
      };

      const mockTrains = [
        {
          id: 1,
          number: '123A',
          model: 'Model X',
          passengers: 100,
          type_id: 1,
          type_name: 'Type A',
        },
      ];

      jest.spyOn(repository, 'findTrains').mockResolvedValue(mockTrains);
      jest.spyOn(repository, 'totalTrains').mockResolvedValue(1);

      const result = await service.getTrains(dto);

      expect(repository.findTrains).toHaveBeenCalledWith(dto);
      expect(repository.totalTrains).toHaveBeenCalledWith(dto);
      expect(result).toEqual(
        new PageData(
          mockTrains.map((train) => ({
            id: train.id,
            number: train.number,
            model: train.model,
            passengers: train.passengers,
            train_type: {
              id: train.type_id,
              name: train.type_name,
            },
          })),
          new PageMeta({ pageOptions: dto, total: 1 }),
        ),
      );
    });
  });

  describe('editTrain', () => {
    it('should call trainRepository.save with correct data', async () => {
      const dto: EditTrainRequestDto = {
        id: 1,
        number: '123A',
        model: 'Model X',
        passengers: 150,
        train_type_id: 1,
      };

      jest.spyOn(repository, 'save').mockResolvedValue({
        ...dto,
      });

      const result = await service.editTrain(dto);

      expect(repository.save).toHaveBeenCalledWith(dto);
      expect(result).toEqual(dto);
    });
  });

  describe('delete', () => {
    it('should call trainRepository.delete with correct id', async () => {
      const id = 1;

      jest
        .spyOn(repository, 'delete')
        .mockResolvedValue({ affected: 1, raw: [] });

      const result = await service.delete(id);

      expect(repository.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual({ affected: 1, raw: [] });
    });
  });
});
