import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Response } from 'express';

import { CoffeeGrowerDTO } from 'src/dto/coffee-grower.dto';
import { ResponseModel } from 'src/models/response.model';
import { CoffeeGrowerService } from './coffee-grower.service';

@Controller('coffee-grower')
export class CoffeeGrowerController {
  private result: ResponseModel;

  constructor(private coffeeGrowerService: CoffeeGrowerService) {}

  @Get('info')
  @ApiOkResponse({ description: 'Return all coffee grower' })
  @ApiBadRequestResponse({ description: 'Invalid or missing param' })
  async getAll(@Res() resp: Response) {
    // Aguardando resposta do banco
    this.result = await this.coffeeGrowerService.getAll();

    // Enviando resposta para o usuário
    resp.status(this.result.status).json(this.result);
  }

  @Post()
  @ApiCreatedResponse({ description: 'Create a coffee grower' })
  @ApiBadRequestResponse({ description: 'Invalid or missing data' })
  async create(@Res() resp: Response, @Body() body: CoffeeGrowerDTO) {
    // Aguardando resposta do banco
    this.result = await this.coffeeGrowerService.create(body);

    // Enviando resposta para o usuário
    resp.status(this.result.status).json(this.result);
  }
}
