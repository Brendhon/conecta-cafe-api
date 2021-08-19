import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { HeaderDTO } from '../../helpers/common/dto/headers.dto';
import { RequestHeader } from '../../helpers/common/validators/request-header.validator';
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
   @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  @ApiCreatedResponse({ description: 'Created with success' })
  @ApiForbiddenResponse({ description: 'Not allowed' })
  @ApiBadRequestResponse({ description: 'Invalid or missing data' })
  async create(
    @Body() body: CoffeeDTO,
    @Param() params: ParamsDTO,
    @RequestHeader(HeaderDTO) headers: HeaderDTO,
  ) {
    this.resp = await this.coffeeService.create(body, params, headers);
    if (!this.resp) throw new ForbiddenException();
    return ResponseFactory(this.resp);
  }

  @Get()
  @ApiOkResponse({ description: 'Return all coffees' })
  @ApiBadRequestResponse({ description: 'Invalid or missing data' })
  async findAll() {
    this.resp = await this.coffeeService.findAll();
    return ResponseFactory(this.resp);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'Coffee id',
    example: '653a410a-cda7-4043-8fe7-fb5426eaeb29',
  })
  @ApiOkResponse({ description: 'Return a specific coffee' })
  @ApiNotFoundResponse({ description: 'Coffee not found' })
  @ApiBadRequestResponse({ description: 'Invalid or missing data' })
  async findOne(@Param() params: ParamsDTO) {
    this.resp = await this.coffeeService.findOne(params);
    if (!this.resp) throw new NotFoundException('Coffee not found');
    else return ResponseFactory(this.resp);
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    description: 'Coffee id',
    example: '653a410a-cda7-4043-8fe7-fb5426eaeb29',
  })
   @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  @ApiOkResponse({ description: 'Updated with success' })
  @ApiForbiddenResponse({ description: 'Not allowed' })
  @ApiBadRequestResponse({ description: 'Invalid or missing data' })
  async update(
    @Param() params: ParamsDTO,
    @Body() body: CoffeeDTO,
    @RequestHeader(HeaderDTO) headers: HeaderDTO,
  ) {
    this.resp = await this.coffeeService.update(params, body, headers);
    if (!this.resp) throw new ForbiddenException();
    else return ResponseFactory({ message: 'Updated with success' });
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'Coffee id',
    example: '653a410a-cda7-4043-8fe7-fb5426eaeb29',
  })
   @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  @ApiOkResponse({ description: 'Removed with success' })
  @ApiForbiddenResponse({ description: 'Not allowed' })
  @ApiBadRequestResponse({ description: 'Invalid or missing data' })
  async remove(
    @Param() params: ParamsDTO,
    @RequestHeader(HeaderDTO) headers: HeaderDTO,
  ) {
    this.resp = await this.coffeeService.remove(params, headers);
    if (!this.resp) throw new ForbiddenException();
    return ResponseFactory({ message: 'Deleted with success' });
  }
}
