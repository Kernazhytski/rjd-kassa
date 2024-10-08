import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { numericTransformer } from '../../transformers/numeric.transformer';
import { Voyage } from '../voyage/voyage.entity';

@Entity('routes')
export class Route {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({ type: 'varchar' })
  start: string;

  @Column({ type: 'varchar' })
  finish: string;

  @Column({
    type: 'numeric',
    precision: 18,
    scale: 2,
    nullable: false,
    transformer: numericTransformer,
  })
  travel_time: number;

  @OneToMany(() => Voyage, (voyage) => voyage.route)
  voyages: Voyage[];
}
