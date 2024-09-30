import { Inject, Injectable } from '@nestjs/common';
import { User_to_roleRepository } from './user_to_role.repository';
import { User_to_role } from './user_to_role.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class UserToRoleService {
  constructor(
    @Inject(User_to_roleRepository)
    private readonly repository: User_to_roleRepository,
  ) {}

  async save(user_to_role: Partial<User_to_role>, manager?: EntityManager) {
    return this.repository.save(user_to_role, manager);
  }
}
