import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User_to_role } from '../user_to_role/user_to_role.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @OneToMany(() => User_to_role, (user_to_role) => user_to_role.role)
  user_to_roles: User_to_role[];
}
