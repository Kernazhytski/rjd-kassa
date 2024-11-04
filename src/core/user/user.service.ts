import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { EntityManager, FindOptionsWhere } from 'typeorm';
import { User } from './user.entity';
import { ClsService } from 'nestjs-cls';
import { MyTicketsRequestDto } from './dto/request/my-tickets-request.dto';
import { PageData } from '../../common/pagination/page.class';
import { PageMeta } from '../../common/pagination/page-meta.class';
import { EditUserRequestDto } from './dto/request/edit-user-request.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepository)
    private readonly repository: UserRepository,
    private readonly cls: ClsService,
  ) {}

  checkUserExistByOption(option: FindOptionsWhere<User>) {
    return this.repository.checkUserExistByOption(option);
  }

  create(data: Partial<User>, manager?: EntityManager) {
    return this.repository.save(data, manager);
  }

  async findUserByLogin(option: FindOptionsWhere<User>) {
    return this.repository.findUserByLogin(option);
  }

  async me() {
    const userId = this.cls.get('userId');

    const user = await this.repository.findById(userId);
    return user;
  }

  async edit(dto: EditUserRequestDto) {
    const userId = this.cls.get('userId');

    return this.repository.save({ ...dto, id: userId });
  }

  async myTickets(dto: MyTicketsRequestDto) {
    const userId = this.cls.get('userId');

    const tickets = await this.repository.myTickets(userId, dto);
    const ticketsCount = await this.repository.myTicketsCount(userId);

    return new PageData(
      tickets,
      new PageMeta({
        total: ticketsCount,
        pageOptions: dto,
      }),
    );
  }
}
