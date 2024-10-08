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
}
