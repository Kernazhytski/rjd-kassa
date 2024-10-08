import { Module } from '@nestjs/common';
import { VoyageService } from './voyage.service';
import { VoyageController } from './voyage.controller';
import { VoyageRepository } from './voyage.repository';
import { Voyage } from './voyage.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouteModule } from '../route/route.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [VoyageService, VoyageRepository],
  controllers: [VoyageController],
  imports: [TypeOrmModule.forFeature([Voyage]), RouteModule, AuthModule],
})
export class VoyageModule {}
