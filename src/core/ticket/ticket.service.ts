import { Inject, Injectable } from '@nestjs/common';
import { TicketRepository } from './ticket.repository';
import { CreateTicketRequestDto } from './dto/request/create-ticket-request.dto';
import { v4 as uuidv4 } from 'uuid';
import { LogicException } from '../../exceptions/logic-exception';
import { LogicExceptionList } from '../../exceptions/types/logic-exceptions.enum';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class TicketService {
  constructor(
    @Inject(TicketRepository)
    private readonly ticketRepository: TicketRepository,
    private readonly cls: ClsService,
  ) {}

  async create(dto: CreateTicketRequestDto) {
    const check = await this.ticketRepository.checkForFreePlaces(dto.voyage_id);
    if (!check?.free_places && check) {
      throw new LogicException(LogicExceptionList.NoPlaces);
    }

    const user_id = this.cls.get('userId');

    const ticket_number = uuidv4();

    return this.ticketRepository.save({
      voyage_id: dto.voyage_id,
      user_id: user_id,
      number: ticket_number,
    });
  }
}
