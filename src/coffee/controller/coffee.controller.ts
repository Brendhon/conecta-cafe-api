import { Body, Controller, Param, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ParamsDTO } from '../../helpers/common/dto/params.dto';
import ResponseFactory from '../../helpers/factory/response-factory';
import { CoffeeDTO } from '../dto/coffee.dto';
import { CoffeeService } from '../service/coffee.service';

@ApiTags('Coffee')
@Controller('coffee')
export class CoffeeController {
  private resp: any;

  constructor(private coffeeService: CoffeeService) {}

  @Post(':id')
  @ApiParam({
    name: 'id',
    description: 'Farm id',
    example: 'e4b9804f-3f35-472e-9d41-fb29ffc0a483',
  })
  @ApiCreatedResponse({ description: 'Created with success' })
  @ApiBadRequestResponse({ description: 'Invalid or missing data' })
  async create(@Body() body: CoffeeDTO, @Param() params: ParamsDTO) {
    this.resp = await this.coffeeService.create(body, params.id);
    return ResponseFactory({ message: 'Create with success' });
  }

  // @Get()
  // @ApiOkResponse({ description: 'Return all coffee grower' })
  // @ApiBadRequestResponse({ description: 'Invalid or missing data' })
  // async findAll() {
  //   this.resp = await this.coffeeGrowerService.findAll();
  //   return ResponseFactory(this.resp);
  // }

  // @Get(':id')
  // @ApiParam({
  //   name: 'id',
  //   description: 'Coffee grower id',
  //   example: '653a410a-cda7-4043-8fe7-fb5426eaeb29',
  // })
  // @ApiOkResponse({ description: 'Return a specific coffee grower' })
  // @ApiNotFoundResponse({ description: 'Coffee grower not found' })
  // @ApiBadRequestResponse({ description: 'Invalid or missing data' })
  // async findOne(@Param() params: ParamsDTO) {
  //   this.resp = await this.coffeeGrowerService.findOne(params.id);
  //   if (!this.resp) throw new NotFoundException('Coffee grower not found');
  //   else return ResponseFactory(this.resp);
  // }

  // @Put(':id')
  // @ApiParam({
  //   name: 'id',
  //   description: 'Coffee grower id',
  //   example: '653a410a-cda7-4043-8fe7-fb5426eaeb29',
  // })
  // @ApiOkResponse({ description: 'Updated with success' })
  // @ApiNotFoundResponse({ description: 'Coffee grower not found' })
  // @ApiBadRequestResponse({ description: 'Invalid or missing data' })
  // async update(@Param() params: ParamsDTO, @Body() body: CoffeeGrowerDTO) {
  //   this.resp = await this.coffeeGrowerService.update(params.id, body);
  //   if (!this.resp.affected) throw new NotFoundException();
  //   else return ResponseFactory({ message: 'Updated with success' });
  // }

  // @Delete(':id')
  // @ApiParam({
  //   name: 'id',
  //   description: 'Coffee grower id',
  //   example: '653a410a-cda7-4043-8fe7-fb5426eaeb29',
  // })
  // @ApiOkResponse({ description: 'coffee grower removed with success' })
  // @ApiNotFoundResponse({ description: 'Coffee grower not found' })
  // @ApiBadRequestResponse({ description: 'Invalid or missing data' })
  // async remove(@Param() params: ParamsDTO) {
  //   this.resp = await this.coffeeGrowerService.remove(params.id);
  //   if (!this.resp.affected) throw new NotFoundException();
  //   return ResponseFactory({ message: 'Deleted with success' });
  // }
}
