import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Voyage } from '../voyage/voyage.entity';

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({ type: 'uuid' })
  number: string;

  @ManyToOne(() => Voyage, (voyage) => voyage.tickets)
  @JoinColumn({ name: 'voyage_id' })
  voyage: Voyage;

  @Column({ type: 'integer' })
  voyage_id: number;

  @Column({ type: 'integer' })
  user_id: number;
}
