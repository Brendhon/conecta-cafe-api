import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { FarmService } from '../service/farm.service';
import ResponseFactory from '../../helpers/factory/response-factory';
import { FarmDTO, GetOneParams } from '../dto/farm.dto';

@ApiTags('Farm')
@Controller('farm')
export class FarmController {
  private resp: any;

  constructor(private farmService: FarmService) {}

  @Post(':id')
  @ApiParam({
    name: 'id',
    description: 'Coffee grower id',
    example: '653a410a-cda7-4043-8fe7-fb5426eaeb29',
  })
  @ApiCreatedResponse({ description: 'Created with success' })
  @ApiBadRequestResponse({ description: 'Invalid or missing data' })
  async create(@Body() body: FarmDTO, @Param() params: GetOneParams) {
    this.resp = await this.farmService.create(body, params.id);
    return ResponseFactory({ message: 'Create with success' });
  }

  @Get()
  @ApiOkResponse({ description: 'Return all data' })
  @ApiBadRequestResponse({ description: 'Invalid or missing data' })
  async findAll() {
    this.resp = await this.farmService.findAll();
    return ResponseFactory(this.resp);
  }

  // @Get('info/:email')
  // @ApiParam({
  //   name: 'email',
  //   description: 'Coffee grower email',
  //   example: 'moises@teste.com.br',
  // })
  // @ApiOkResponse({ description: 'Return a specific coffee grower' })
  // @ApiNotFoundResponse({ description: 'Coffee grower not found' })
  // @ApiBadRequestResponse({ description: 'Invalid or missing data' })
  // async findOne(@Param() params: GetOneParams) {
  //   this.resp = await this.farmService.findOne(params.email);
  //   if (!this.resp) throw new NotFoundException('Coffee grower not found');
  //   else return ResponseFactory(this.resp);
  // }

  // @Put(':email')
  // @ApiParam({
  //   name: 'email',
  //   description: 'Coffee grower email',
  //   example: 'moises@teste.com.br',
  // })
  // @ApiOkResponse({ description: 'Return a specific coffee grower' })
  // @ApiNotFoundResponse({ description: 'Coffee grower not found' })
  // @ApiBadRequestResponse({ description: 'Invalid or missing data' })
  // async update(@Param() params: GetOneParams, @Body() body: CoffeeGrowerDTO) {
  //   this.resp = await this.farmService.update(params.email, body);
  //   if (!this.resp.affected) throw new NotFoundException();
  //   else return ResponseFactory({ message: 'Updated with success' });
  // }

  // @Delete(':email')
  // @ApiParam({
  //   name: 'email',
  //   description: 'Coffee grower email',
  //   example: 'moises@teste.com.br',
  // })
  // @ApiOkResponse({ description: 'coffee grower removed with success' })
  // @ApiNotFoundResponse({ description: 'Coffee grower not found' })
  // @ApiBadRequestResponse({ description: 'Invalid or missing data' })
  // async remove(@Param() params: GetOneParams) {
  //   this.resp = await this.farmService.remove(params.email);
  //   if (!this.resp.affected) throw new NotFoundException();
  //   return ResponseFactory({ message: 'Deleted with success' });
  // }
}
