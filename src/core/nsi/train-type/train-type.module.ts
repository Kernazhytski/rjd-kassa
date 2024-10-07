import { Module } from '@nestjs/common';
import { TrainTypeService } from './train-type.service';
import { TrainTypeController } from './train-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainType } from './train-type.entity';
import { AuthModule } from '../../auth/auth.module';

@Module({
  providers: [TrainTypeService],
  controllers: [TrainTypeController],
  imports: [TypeOrmModule.forFeature([TrainType]), AuthModule],
})
export class TrainTypeModule {}
