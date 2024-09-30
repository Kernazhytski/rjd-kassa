import { Module } from '@nestjs/common';
import { UserToRoleService } from './user_to_role.service';
import { User_to_roleRepository } from './user_to_role.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User_to_role } from './user_to_role.entity';

@Module({
  providers: [UserToRoleService, User_to_roleRepository],
  imports: [TypeOrmModule.forFeature([User_to_role])],
  exports: [UserToRoleService],
})
export class UserToRoleModule {}
