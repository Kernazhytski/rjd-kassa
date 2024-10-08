import { Module } from '@nestjs/common';
import { RouteService } from './route.service';
import { RouteController } from './route.controller';
import { RouteRepository } from './route.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Route } from './route.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [RouteService, RouteRepository],
  controllers: [RouteController],
  imports: [TypeOrmModule.forFeature([Route]), AuthModule],
  exports: [RouteService],
})
export class RouteModule {}
