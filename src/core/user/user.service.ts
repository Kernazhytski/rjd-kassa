import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { EntityManager, FindOptionsWhere } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepository)
    private readonly repository: UserRepository,
  ) {}

  checkUserExistByOption(option: FindOptionsWhere<User>) {
    return this.repository.checkUserExistByOption(option);
  }

  create(data: Partial<User>, manager?: EntityManager) {
    return this.repository.create(data, manager);
  }

  async findUserByLogin(option: FindOptionsWhere<User>) {
    return this.repository.findUserByLogin(option);
  }
}
