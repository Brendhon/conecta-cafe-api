import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CoffeeGrowerDTO } from '../dto/coffee-grower.dto';
import { CoffeeGrowerService } from '../service/coffee-grower.service';

@ApiTags('Coffee grower')
@Controller('coffee-grower')
export class CoffeeGrowerController {
  constructor(private coffeeGrowerService: CoffeeGrowerService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Created coffee grower' })
  @ApiBadRequestResponse({ description: 'Invalid or missing data' })
  async create(@Body() body: CoffeeGrowerDTO) {
    return await this.coffeeGrowerService.create(body);
  }

  @Get('info')
  @ApiOkResponse({ description: 'Return all coffee grower' })
  @ApiBadRequestResponse({ description: 'Invalid or missing data' })
  async getAll() {
    return await this.coffeeGrowerService.getAll();
  }
}
