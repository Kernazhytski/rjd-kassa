import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './ticket.entity';
import { AuthModule } from '../auth/auth.module';
import { TicketRepository } from './ticket.repository';

@Module({
  providers: [TicketService, TicketRepository],
  controllers: [TicketController],
  imports: [TypeOrmModule.forFeature([Ticket]), AuthModule],
})
export class TicketModule {}
