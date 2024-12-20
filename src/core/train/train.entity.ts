import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TrainType } from '../nsi/train-type/train-type.entity';
import { Voyage } from '../voyage/voyage.entity';

@Entity('trains')
export class Train {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({ type: 'varchar' })
  number: string;

  @Column({ type: 'varchar' })
  model: string;

  @Column({ type: 'integer' })
  passengers: number;

  @ManyToOne(() => TrainType)
  @JoinColumn({ name: 'train_type_id' })
  train_type: TrainType;

  @Column({ type: 'integer' })
  train_type_id: number;

  @OneToMany(() => Voyage, (voyage) => voyage.train)
  voyages: Voyage[];
}
