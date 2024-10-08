import { Ticket } from './ticket.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TicketRepository {
  constructor(
    @InjectRepository(Ticket)
    private readonly repository: Repository<Ticket>,
  ) {}

  async save(data: Partial<Ticket>, manager?: EntityManager) {
    return manager ? manager.save(Ticket, data) : this.repository.save(data);
  }

  async delete(id: number) {
    return this.repository.delete(id);
  }

  async checkForFreePlaces(voyage_id: number) {
    const query = this.repository
      .createQueryBuilder('ticket')
      .select(
        'CASE WHEN COUNT(ticket) < train.passengers THEN true ELSE false END as free_places',
      )
      .leftJoin('ticket.voyage', 'voyage')
      .leftJoin('voyage.train', 'train')
      .where('voyage.id = :voyage_id', { voyage_id })
      .groupBy('train.passengers, voyage.id');

    return query.getRawOne();
  }

  async getTicketInfo(id: number) {
    const query = this.repository
      .createQueryBuilder('ticket')
      .select([
        "CONCAT(user.name, ' ', user.surname,' ', user.patronymic) as fio",
        'voyage.ticket_cost as price',
        "to_char(voyage.start_date, 'DD.MM.YYYY') as depart",
        "to_char(voyage.start_date + interval '1m' * route.travel_time, 'DD.MM.YYYY') as arrive",
        'train.number as train_num',
        'CASE WHEN voyage.is_start THEN route.start ELSE route.finish END as from',
        'CASE WHEN voyage.is_start THEN route.finish ELSE route.start END as to',
        "to_char(NOW(), 'DD-MM-YYYY') as date",
      ])
      .leftJoin('ticket.user', 'user')
      .leftJoin('ticket.voyage', 'voyage')
      .leftJoin('voyage.train', 'train')
      .leftJoin('voyage.route', 'route')
      .where('ticket.id = :id', { id });

    return query.getRawOne();
  }
}
