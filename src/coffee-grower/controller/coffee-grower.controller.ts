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
    return ResponseFactory({
      id: this.resp.id,
      message: 'Create with success',
    });
  }

  @Get()
  @ApiOkResponse({ description: 'Return all coffee grower' })
  @ApiBadRequestResponse({ description: 'Invalid or missing data' })
  async findAll() {
    this.resp = await this.coffeeGrowerService.findAll();
    return ResponseFactory(this.resp);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'Coffee grower id',
    example: '653a410a-cda7-4043-8fe7-fb5426eaeb29',
  })
  @ApiOkResponse({ description: 'Return a specific coffee grower' })
  @ApiNotFoundResponse({ description: 'Coffee grower not found' })
  @ApiBadRequestResponse({ description: 'Invalid or missing data' })
  async findOne(@Param() params: GetOneParams) {
    this.resp = await this.coffeeGrowerService.findOne(params.id);
    if (!this.resp) throw new NotFoundException('Coffee grower not found');
    else return ResponseFactory(this.resp);
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    description: 'Coffee grower id',
    example: '653a410a-cda7-4043-8fe7-fb5426eaeb29',
  })
  @ApiOkResponse({ description: 'Return a specific coffee grower' })
  @ApiNotFoundResponse({ description: 'Coffee grower not found' })
  @ApiBadRequestResponse({ description: 'Invalid or missing data' })
  async update(@Param() params: GetOneParams, @Body() body: CoffeeGrowerDTO) {
    this.resp = await this.coffeeGrowerService.update(params.id, body);
    if (!this.resp.affected) throw new NotFoundException();
    else return ResponseFactory({ message: 'Updated with success' });
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'Coffee grower id',
    example: '653a410a-cda7-4043-8fe7-fb5426eaeb29',
  })
  @ApiOkResponse({ description: 'coffee grower removed with success' })
  @ApiNotFoundResponse({ description: 'Coffee grower not found' })
  @ApiBadRequestResponse({ description: 'Invalid or missing data' })
  async remove(@Param() params: GetOneParams) {
    this.resp = await this.coffeeGrowerService.remove(params.id);
    if (!this.resp.affected) throw new NotFoundException();
    return ResponseFactory({ message: 'Deleted with success' });
  }
}
