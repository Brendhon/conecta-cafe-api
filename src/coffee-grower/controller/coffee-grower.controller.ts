import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import ResponseFactory from '../../helpers/factory/response-factory';

import { CoffeeGrowerDTO, GetOneParams } from '../dto/coffee-grower.dto';
import { CoffeeGrowerService } from '../service/coffee-grower.service';

@ApiTags('Coffee grower')
@Controller('coffee-grower')
export class CoffeeGrowerController {
  private resp: any;

  constructor(private coffeeGrowerService: CoffeeGrowerService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Created coffee grower' })
  @ApiBadRequestResponse({ description: 'Invalid or missing data' })
  async create(@Body() body: CoffeeGrowerDTO) {
    this.resp = await this.coffeeGrowerService.create(body);
    return ResponseFactory({ message: 'Create with success' });
  }

  @Get()
  @ApiOkResponse({ description: 'Return all coffee grower' })
  @ApiBadRequestResponse({ description: 'Invalid or missing data' })
  async findAll() {
    this.resp = await this.coffeeGrowerService.findAll();
    return ResponseFactory(this.resp);
  }

  @Get(':email')
  @ApiParam({
    name: 'email',
    description: 'Coffee grower email',
    example: 'moises@teste.com.br',
  })
  @ApiOkResponse({ description: 'Return a specific coffee grower' })
  @ApiNotFoundResponse({ description: 'Coffee grower not found' })
  @ApiBadRequestResponse({ description: 'Invalid or missing data' })
  async findOne(@Param() params: GetOneParams) {
    this.resp = await this.coffeeGrowerService.findOne(params.email);
    if (!this.resp) throw new NotFoundException('Coffee grower not found');
    else return ResponseFactory(this.resp);
  }

  @Put(':email')
  @ApiParam({
    name: 'email',
    description: 'Coffee grower email',
    example: 'moises@teste.com.br',
  })
  @ApiOkResponse({ description: 'Return a specific coffee grower' })
  @ApiNotFoundResponse({ description: 'Coffee grower not found' })
  @ApiBadRequestResponse({ description: 'Invalid or missing data' })
  async update(@Param() params: GetOneParams, @Body() body: CoffeeGrowerDTO) {
    this.resp = await this.coffeeGrowerService.update(params.email, body);
    if (!this.resp.affected) throw new NotFoundException();
    else return ResponseFactory({ message: 'Updated with success' });
  }

  @Delete(':email')
  @ApiParam({
    name: 'email',
    description: 'Coffee grower email',
    example: 'moises@teste.com.br',
  })
  @ApiOkResponse({ description: 'coffee grower removed with success' })
  @ApiNotFoundResponse({ description: 'Coffee grower not found' })
  @ApiBadRequestResponse({ description: 'Invalid or missing data' })
  async remove(@Param() params: GetOneParams) {
    this.resp = await this.coffeeGrowerService.remove(params.email);
    if (!this.resp.affected) throw new NotFoundException();
    return ResponseFactory({ message: 'Deleted with success' });
  }
}
