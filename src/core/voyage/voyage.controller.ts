import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { VoyageService } from './voyage.service';
import { CreateVoyageRequestDto } from './dto/create-voyage-request.dto';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../../common/guards/admin.guard';

@ApiTags('Voyage')
@ApiSecurity('bearer')
@Controller('voyage')
export class VoyageController {
  constructor(private readonly service: VoyageService) {}

  @ApiOperation({ summary: 'Create voyage' })
  @UseGuards(AdminGuard)
  @Post()
  async create(@Body() dto: CreateVoyageRequestDto) {
    return this.service.create(dto);
  }
}
