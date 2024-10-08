import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketRequestDto } from './dto/request/create-ticket-request.dto';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../common/guards/auth.guard';

@ApiTags('Ticket')
@ApiSecurity('bearer')
@Controller('ticket')
export class TicketController {
  constructor(private readonly service: TicketService) {}

  @ApiOperation({
    summary: 'Buy ticket',
  })
  @UseGuards(AuthGuard)
  @Post('buy')
  async buyTicket(@Body() dto: CreateTicketRequestDto) {
    return this.service.create(dto);
  }
}
