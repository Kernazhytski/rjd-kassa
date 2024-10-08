import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Route } from '../route/route.entity';
import { Train } from '../train/train.entity';

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

  @Column({ type: 'date' })
  start_date: Date;

  @Column({ type: 'boolean' })
  is_start: boolean;
}
