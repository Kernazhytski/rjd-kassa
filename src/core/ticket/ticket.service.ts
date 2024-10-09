import { Inject, Injectable } from '@nestjs/common';
import { TicketRepository } from './ticket.repository';
import { CreateTicketRequestDto } from './dto/request/create-ticket-request.dto';
import { v4 as uuidv4 } from 'uuid';
import { LogicException } from '../../exceptions/logic-exception';
import { LogicExceptionList } from '../../exceptions/types/logic-exceptions.enum';
import { ClsService } from 'nestjs-cls';
import { DocsService } from '../docs/docs.service';
import * as fs from 'node:fs';
import { PdfService } from '../pdf/pdf.service';
import { UserService } from 'core/user/user.service';
import { IsNull, Not } from 'typeorm';

@Injectable()
export class TicketService {
  constructor(
    @Inject(TicketRepository)
    private readonly ticketRepository: TicketRepository,
    private readonly cls: ClsService,
    private readonly docsService: DocsService,
    private readonly pdfService: PdfService,
    private readonly userService: UserService,
  ) {
    this.file = fs.readFileSync(
      './src/core/ticket/file/Train Ticket Template.docx',
    );
  }

  private file: Buffer;

  async create(dto: CreateTicketRequestDto) {
    const check = await this.ticketRepository.checkForFreePlaces(dto.voyage_id);
    if (!check?.free_places && check) {
      throw new LogicException(LogicExceptionList.NoPlaces);
    }

    const user_id = this.cls.get('userId');

    const user = await this.userService.checkUserExistByOption({
      id: user_id,
      name: Not(IsNull()),
      surname: Not(IsNull()),
      patronymic: Not(IsNull()),
      passport_num: Not(IsNull()),
    });
    if (!user) {
      throw new LogicException(LogicExceptionList.UserIsNotRegistred);
    }

    const ticket_number = uuidv4();

    return this.ticketRepository.save({
      voyage_id: dto.voyage_id,
      user_id: user_id,
      number: ticket_number,
    });
  }

  async print(id: number) {
    const ticket_info = await this.ticketRepository.getTicketInfo(id);

    const ticketPrint = this.docsService.generateDocx(ticket_info, this.file);

    return this.pdfService.convertDocxToPdf(ticketPrint);
  }
}
