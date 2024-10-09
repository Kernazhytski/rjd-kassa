import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { EntityManager, FindOptionsWhere, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { MyTicketsRequestDto } from './dto/request/my-tickets-request.dto';

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

  async findById(id: string) {
    return this.repository.findOne({
      where: { id },
      select: {
        passport_num: true,
        surname: true,
        name: true,
        patronymic: true,
      },
    });
  }

  async myTickets(userId: string, dto: MyTicketsRequestDto) {
    return this.repository
      .createQueryBuilder('user')
      .select([
        'ticket.id as id',
        'voyage.start_date as start_date',
        'train.number as train_number',
        'CASE WHEN voyage.is_start THEN route.start ELSE route.finish END as from',
        'CASE WHEN voyage.is_start THEN route.finish ELSE route.start END as to',
      ])
      .leftJoin('user.tickets', 'ticket')
      .leftJoin('ticket.voyage', 'voyage')
      .leftJoin('voyage.train', 'train')
      .leftJoin('voyage.route', 'route')
      .where('user.id = :id', { id: userId })
      .orderBy(dto.sortBy, dto.sortDirection.toUpperCase() as 'ASC' | 'DESC')
      .offset(dto.skip)
      .limit(dto.perPage)
      .getRawMany();
  }

  async myTicketsCount(userId: string) {
    return this.repository
      .createQueryBuilder('user')
      .leftJoin('user.tickets', 'ticket')
      .leftJoin('ticket.voyage', 'voyage')
      .leftJoin('voyage.train', 'train')
      .leftJoin('voyage.route', 'route')
      .where('user.id = :id', { id: userId })
      .getCount();
  }
}
