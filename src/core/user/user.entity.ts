import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User_to_role } from '../user_to_role/user_to_role.entity';

@Entity('users')
export class User {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'varchar', nullable: true })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  surname: string;

  @Column({ type: 'varchar', nullable: true })
  patronymic: string;

  @Column({ type: 'varchar', nullable: true })
  passport_num: string;

  @Column({ unique: true, type: 'varchar' })
  login: string;

  @Column({ type: 'varchar' })
  password: string;

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }

  @OneToMany(() => User_to_role, (user_to_role) => user_to_role.user)
  user_to_roles: User_to_role[];
}
