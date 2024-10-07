import { Module } from '@nestjs/common';
import { TrainService } from './train.service';
import { TrainController } from './train.controller';
import { TrainRepository } from './train.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Train } from './train.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [TrainService, TrainRepository],
  controllers: [TrainController],
  imports: [TypeOrmModule.forFeature([Train]), AuthModule],
  exports: [TrainService],
})
export class TrainModule {}
