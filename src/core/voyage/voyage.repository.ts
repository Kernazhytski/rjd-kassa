import { Injectable } from '@nestjs/common';
import { Voyage } from './voyage.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

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
}
