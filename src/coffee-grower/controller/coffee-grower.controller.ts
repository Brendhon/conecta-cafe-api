import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';

import { CoffeeGrowerDTO } from 'src/coffee-grower/dto/coffee-grower.dto';
import { ResponseModel } from 'src/helpers/common/models/response.model';
import { CoffeeGrowerService } from '../service/coffee-grower.service';

@ApiTags('Coffee grower')
@Controller('coffee-grower')
export class CoffeeGrowerController {
  private result: ResponseModel;

  constructor(private coffeeGrowerService: CoffeeGrowerService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Created coffee grower' })
  @ApiBadRequestResponse({ description: 'Invalid or missing data' })
  async create(@Res() resp: Response, @Body() body: CoffeeGrowerDTO) {
    // Aguardando resposta do banco
    this.result = await this.coffeeGrowerService.create(body);

    // Enviando resposta para o usuário
    resp.status(this.result.status).json(this.result);
  }

  @Get('info')
  @ApiOkResponse({ description: 'Return all coffee grower' })
  @ApiBadRequestResponse({ description: 'Invalid or missing data' })
  async getAll(@Res() resp: Response) {
    // Aguardando resposta do banco
    this.result = await this.coffeeGrowerService.getAll();

    // Enviando resposta para o usuário
    resp.status(this.result.status).json(this.result);
  }
}
