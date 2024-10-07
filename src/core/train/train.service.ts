import { Inject, Injectable } from '@nestjs/common';
import { TrainRepository } from './train.repository';
import { CreateTrainRequestDto } from './dto/request/create-train-request.dto';
import { GetTrainsRequestDto } from './dto/request/get-trains-request.dto';
import { EditTrainRequestDto } from './dto/request/edit-train-request.dto';
import { PageData } from '../../common/pagination/page.class';
import { PageMeta } from '../../common/pagination/page-meta.class';

@Injectable()
export class TrainService {
  constructor(
    @Inject()
    private readonly trainRepository: TrainRepository,
  ) {}

  async create(dto: CreateTrainRequestDto) {
    return this.trainRepository.save(dto);
  }

  async getTrains(dto: GetTrainsRequestDto) {
    const trains = await this.trainRepository.findTrains(dto);
    const trains_count = await this.trainRepository.totalTrains(dto);

    return new PageData(
      trains.map((train) => {
        return {
          id: train.id,
          number: train.number,
          model: train.model,
          passengers: train.passengers,
          train_type: {
            id: train.train_type?.id,
            name: train.train_type?.name,
          },
        };
      }),
      new PageMeta({ pageOptions: dto, total: trains_count }),
    );
  }

  async editTrain(dto: EditTrainRequestDto) {
    return this.trainRepository.save(dto);
  }

  async delete(id: number) {
    return this.trainRepository.delete(id);
  }
}
