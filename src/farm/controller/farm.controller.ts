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
import { FarmService } from '../service/farm.service';
import ResponseFactory from '../../helpers/factory/response-factory';
import { FarmDTO } from '../dto/farm.dto';
import { HeaderDTO } from '../../helpers/common/dto/headers.dto';
import { RequestHeader } from '../../helpers/common/validators/request-header.validator';
import { ParamsDTO } from '../../helpers/common/dto/params.dto';

@ApiTags('Farm')
@Controller('farm')
export class FarmController {
  private resp: any;

  constructor(private service: FarmService) {}

  @Post()
  @ApiHeader({
    name: 'Authorization',
    description: 'Authorization token',
    required: true,
  })
  @ApiCreatedResponse({ description: 'Created with success' })
  @ApiBadRequestResponse({ description: 'Invalid or missing data' })
  async create(
    @Body() body: FarmDTO,
    @RequestHeader(HeaderDTO) headers: HeaderDTO,
  ) {
    this.resp = await this.service.create(body, headers);
    return ResponseFactory(this.resp);
  }

  @Get()
  @ApiOkResponse({ description: 'Return all data' })
  @ApiBadRequestResponse({ description: 'Invalid or missing data' })
  async findAll() {
    this.resp = await this.service.findAll();
    return ResponseFactory(this.resp);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'Farm id',
    example: 'e4b9804f-3f35-472e-9d41-fb29ffc0a483',
  })
  @ApiOkResponse({ description: 'Return a specific farm' })
  @ApiNotFoundResponse({ description: 'Farm not found' })
  @ApiBadRequestResponse({ description: 'Invalid or missing data' })
  async findOne(@Param() params: ParamsDTO) {
    this.resp = await this.service.findOne(params);
    if (!this.resp) throw new NotFoundException();
    else return ResponseFactory(this.resp);
  }

  @Put(':id')
  @ApiHeader({
    name: 'Authorization',
    description: 'Authorization token',
    required: true,
  })
  @ApiParam({
    name: 'id',
    description: 'Farm id',
    example: 'e4b9804f-3f35-472e-9d41-fb29ffc0a483',
  })
  @ApiOkResponse({ description: 'Updated with success' })
  @ApiForbiddenResponse({ description: 'Not allowed' })
  @ApiBadRequestResponse({ description: 'Invalid or missing data' })
  async update(
    @RequestHeader(HeaderDTO) headers: HeaderDTO,
    @Param() params: ParamsDTO,
    @Body() body: FarmDTO,
  ) {
    this.resp = await this.service.update(params, body, headers);
    if (!this.resp) throw new ForbiddenException();
    else return ResponseFactory({ message: 'Updated with success' });
  }

  @Delete(':id')
  @ApiHeader({
    name: 'Authorization',
    description: 'Authorization token',
    required: true,
  })
  @ApiParam({
    name: 'id',
    description: 'Farm id',
    example: 'e4b9804f-3f35-472e-9d41-fb29ffc0a483',
  })
  @ApiOkResponse({ description: 'Removed with success' })
  @ApiForbiddenResponse({ description: 'Not allowed' })
  @ApiBadRequestResponse({ description: 'Invalid or missing data' })
  async remove(
    @RequestHeader(HeaderDTO) headers: HeaderDTO,
    @Param() params: ParamsDTO,
  ) {
    this.resp = await this.service.remove(params, headers);
    if (!this.resp.affected) throw new ForbiddenException();
    else return ResponseFactory({ message: 'Deleted with success' });
  }
}
