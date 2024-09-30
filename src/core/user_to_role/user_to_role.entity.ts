import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../role/role.entity';
import { User } from '../user/user.entity';

@Entity('user_to_roles')
export class User_to_role {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @ManyToOne(() => User, (user) => user.user_to_roles)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'uuid' })
  user_id: string;

  @ManyToOne(() => Role, (role) => role.user_to_roles)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @Column({ type: 'integer' })
  role_id: number;
}
