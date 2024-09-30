import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { EntityManager, FindOptionsWhere, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async checkUserExistByOption(option: FindOptionsWhere<User>) {
    return this.repository.exists({ where: option });
  }

  async create(data: Partial<User>, manager?: EntityManager) {
    const user = Object.assign(new User(), data);

    return manager ? manager.save(User, user) : this.repository.save(user);
  }

  async findUserByLogin(option: FindOptionsWhere<User>) {
    return this.repository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.user_to_roles', 'user_to_role')
      .leftJoinAndSelect('user_to_role.role', 'role')
      .where(option)
      .getOne();
  }
}
