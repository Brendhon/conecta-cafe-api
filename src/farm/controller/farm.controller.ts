import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { FarmService } from '../service/farm.service';
import ResponseFactory from '../../helpers/factory/response-factory';
import { FarmDTO, GetOneParams } from '../dto/farm.dto';
import { RequestHeader } from 'src/helpers/common/validators/request-header.validator';
import { HeaderDTO } from '../dto/headers.dto';

@ApiTags('Farm')
@Controller('farm')
export class FarmController {
  private resp: any;

  constructor(private farmService: FarmService) {}

  @Post()
  @ApiHeader({
    name: 'Authorization',
    description: 'Authorization token',
    example: '653a410a-cda7-4043-8fe7-fb5426eaeb29',
  })
  @ApiCreatedResponse({ description: 'Created with success' })
  @ApiBadRequestResponse({ description: 'Invalid or missing data' })
  async create(
    @Body() body: FarmDTO,
    @RequestHeader(HeaderDTO) headers: HeaderDTO,
  ) {
    this.resp = await this.farmService.create(body, headers.authorization);
    return ResponseFactory({ message: 'Create with success' });
  }

  @Get()
  @ApiOkResponse({ description: 'Return all data' })
  @ApiBadRequestResponse({ description: 'Invalid or missing data' })
  async findAll() {
    this.resp = await this.farmService.findAll();
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
  async findOne(@Param() params: GetOneParams) {
    this.resp = await this.farmService.findOne(params.id);
    if (!this.resp) throw new NotFoundException('Farm not found');
    else return ResponseFactory(this.resp);
  }

  @Put(':id')
  @ApiHeader({
    name: 'Authorization',
    description: 'Authorization token',
    example: '653a410a-cda7-4043-8fe7-fb5426eaeb29',
  })
  @ApiParam({
    name: 'id',
    description: 'Farm id',
    example: 'e4b9804f-3f35-472e-9d41-fb29ffc0a483',
  })
  @ApiOkResponse({ description: 'Updated with success' })
  @ApiNotFoundResponse({ description: 'Farm not found' })
  @ApiBadRequestResponse({ description: 'Invalid or missing data' })
  async update(
    @RequestHeader(HeaderDTO) headers: HeaderDTO,
    @Param() params: GetOneParams,
    @Body() body: FarmDTO,
  ) {
    this.resp = await this.farmService.update(
      params.id,
      body,
      headers.authorization,
    );
    if (!this.resp) throw new NotFoundException();
    else return ResponseFactory({ message: 'Updated with success' });
  }

  /* @Delete()
  @ApiHeader({
    name: 'Authorization',
    description: 'Authorization token',
    example: '653a410a-cda7-4043-8fe7-fb5426eaeb29',
  })
  @ApiOkResponse({ description: 'Removed with success' })
  @ApiNotFoundResponse({ description: 'Farm not found' })
  @ApiBadRequestResponse({ description: 'Invalid or missing data' })
  async remove(@Param() params: GetOneParams) {
    this.resp = await this.farmService.remove(params.email);
    if (!this.resp.affected) throw new NotFoundException();
    return ResponseFactory({ message: 'Deleted with success' });
  } */
}
