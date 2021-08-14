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

import { CoffeeGrowerDTO } from '../dto/coffee-grower.dto';
import { CoffeeGrowerService } from '../service/coffee-grower.service';

@ApiTags('Coffee grower')
@Controller('coffee-grower')
export class CoffeeGrowerController {
  private resp: any;

  constructor(private service: CoffeeGrowerService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Create with success' })
  @ApiBadRequestResponse({ description: 'Invalid or missing data' })
  async create(@Body() body: CoffeeGrowerDTO) {
    this.resp = await this.service.create(body);
    return ResponseFactory(this.resp);
  }

  @Get()
  @ApiOkResponse({ description: 'Return all coffee grower' })
  @ApiBadRequestResponse({ description: 'Invalid or missing data' })
  async findAll() {
    this.resp = await this.service.findAll();
    return ResponseFactory(this.resp);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'Coffee grower id',
    example: '653a410a-cda7-4043-8fe7-fb5426eaeb29',
  })
  @ApiOkResponse({ description: 'Return a specific coffee grower' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiBadRequestResponse({ description: 'Invalid or missing data' })
  async findOne(@Param() params: ParamsDTO) {
    this.resp = await this.service.findOne(params.id);
    if (!this.resp) throw new NotFoundException();
    else return ResponseFactory(this.resp);
  }

  @Put()
  @ApiHeader({
    name: 'Authorization',
    description: 'Authorization token',
    required: true,
  })
  @ApiOkResponse({ description: 'Updated with success' })
  @ApiForbiddenResponse({ description: 'Not allowed' })
  @ApiBadRequestResponse({ description: 'Invalid or missing data' })
  async update(
    @RequestHeader(HeaderDTO) headers: HeaderDTO,
    @Body() body: CoffeeGrowerDTO,
  ) {
    this.resp = await this.service.update(headers.authorization, body);
    if (!this.resp.affected) throw new ForbiddenException();
    else return ResponseFactory({ message: 'Updated with success' });
  }

  @Delete()
  @ApiHeader({
    name: 'Authorization',
    description: 'Authorization token',
    required: true,
  })
  @ApiOkResponse({ description: 'Removed with success' })
  @ApiForbiddenResponse({ description: 'Not allowed' })
  @ApiBadRequestResponse({ description: 'Invalid or missing data' })
  async remove(@RequestHeader(HeaderDTO) headers: HeaderDTO) {
    this.resp = await this.service.remove(headers.authorization);
    if (!this.resp.affected) throw new ForbiddenException();
    return ResponseFactory({ message: 'Deleted with success' });
  }
}
