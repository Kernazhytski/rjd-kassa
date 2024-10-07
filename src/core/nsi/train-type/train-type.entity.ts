import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('nsi_train_types')
export class TrainType {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({ type: 'varchar' })
  name: string;
}
