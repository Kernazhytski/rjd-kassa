import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Route } from '../route/route.entity';
import { Train } from '../train/train.entity';
import { Ticket } from '../ticket/ticket.entity';
import { numericTransformer } from '../../transformers/numeric.transformer';

@Entity('voyages')
export class Voyage {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @ManyToOne(() => Route, (route) => route.voyages)
  @JoinColumn({ name: 'route_id' })
  route: Route;

  @Column({ type: 'integer' })
  route_id: number;

  @ManyToOne(() => Train, (train) => train.voyages)
  @JoinColumn({ name: 'train_id' })
  train: Train;

  @Column({ type: 'integer' })
  train_id: number;

  @Column({ type: 'timestamp' })
  start_date: Date;

  @Column({ type: 'boolean' })
  is_start: boolean;

  @Column({
    type: 'numeric',
    precision: 18,
    scale: 2,
    nullable: false,
    transformer: numericTransformer,
  })
  ticket_cost: number;

  @OneToMany(() => Ticket, (ticket) => ticket.voyage)
  tickets: Ticket[];
}
