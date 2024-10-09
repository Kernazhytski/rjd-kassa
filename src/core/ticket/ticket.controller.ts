import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketRequestDto } from './dto/request/create-ticket-request.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../../common/guards/auth.guard';
import { Response } from 'express';
import { ApiException } from '../../common/decorators/api-exception.decorator';
import { LogicExceptionList } from '../../exceptions/types/logic-exceptions.enum';

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
  @ApiException([
    LogicExceptionList.NoPlaces,
    LogicExceptionList.UserIsNotRegistred,
  ])
  async buyTicket(@Body() dto: CreateTicketRequestDto) {
    return this.service.create(dto);
  }

  @ApiOperation({
    summary: 'Print ticket',
  })
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    content: {
      'application/pdf': {
        schema: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Get('print/:id')
  async print(@Param('id') id: number, @Res() res: Response) {
    const ticket = await this.service.print(id);

    const encodedFileName =
      encodeURIComponent(`ticket_${new Date().toISOString()}`) + '.pdf';
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${encodedFileName}"`,
    );
    res.send(ticket);
  }
}
