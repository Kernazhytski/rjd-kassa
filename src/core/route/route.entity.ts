import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { numericTransformer } from '../../transformers/numeric.transformer';

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
}
