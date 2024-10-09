import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './ticket.entity';
import { AuthModule } from '../auth/auth.module';
import { TicketRepository } from './ticket.repository';
import { DocsModule } from '../docs/docs.module';
import { PdfService } from '../pdf/pdf.service';
import { UserModule } from '../user/user.module';

@Module({
  providers: [TicketService, TicketRepository, PdfService],
  controllers: [TicketController],
  imports: [
    TypeOrmModule.forFeature([Ticket]),
    AuthModule,
    DocsModule,
    UserModule,
  ],
})
export class TicketModule {}
