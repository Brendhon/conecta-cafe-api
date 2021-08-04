import { Controller, Get } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FarmService } from './farm.service';

@ApiTags('Farm')
@Controller('farm')
export class FarmController {
  constructor(private farmService: FarmService) {}

  @Get('info')
  @ApiOkResponse({ description: 'Return all farms' })
  @ApiBadRequestResponse({ description: 'Invalid or missing param' })
  getHello(): string {
    return this.farmService.create('Hello World!');
  }
}
