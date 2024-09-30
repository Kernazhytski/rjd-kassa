import { InjectRepository } from '@nestjs/typeorm';
import { User_to_role } from './user_to_role.entity';
import { EntityManager, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class User_to_roleRepository {
  constructor(
    @InjectRepository(User_to_role)
    private readonly repository: Repository<User_to_role>,
  ) {}

  async save(
    user_to_role: Partial<User_to_role>,
    manager?: EntityManager,
  ): Promise<User_to_role> {
    return manager
      ? manager.save(User_to_role, user_to_role)
      : this.repository.save(user_to_role);
  }
}
