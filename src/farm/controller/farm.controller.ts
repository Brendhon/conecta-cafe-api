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
  Request,
  UseGuards,
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
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { FarmService } from '../service/farm.service';
import ResponseFactory from '../../helpers/factory/response-factory';
import { FarmDTO } from '../dto/farm.dto';
import { ParamsDTO } from '../../helpers/common/dto/params.dto';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';

@ApiTags('Farm')
@Controller('farm')
export class FarmController {
  private resp: any;

  constructor(private service: FarmService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  @ApiUnauthorizedResponse({ description: 'No auth token' })
  @ApiCreatedResponse({ description: 'Created with success' })
  @ApiBadRequestResponse({ description: 'Invalid or missing data' })
  async create(@Request() req, @Body() body: FarmDTO) {
    this.resp = await this.service.create(body, req.user.id);
    return ResponseFactory(this.resp);
  }

  @Get('all')
  @ApiOkResponse({ description: 'Return all farms' })
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
  @UseGuards(JwtAuthGuard)
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  @ApiParam({
    name: 'id',
    description: 'Farm id',
    example: 'e4b9804f-3f35-472e-9d41-fb29ffc0a483',
  })
  @ApiOkResponse({ description: 'Updated with success' })
  @ApiUnauthorizedResponse({ description: 'No auth token' })
  @ApiForbiddenResponse({ description: 'Not allowed' })
  @ApiBadRequestResponse({ description: 'Invalid or missing data' })
  async update(
    @Request() req,
    @Param() params: ParamsDTO,
    @Body() body: FarmDTO,
  ) {
    this.resp = await this.service.update(params, body, req.user.id);
    if (!this.resp) throw new ForbiddenException();
    else return ResponseFactory({ message: 'Updated with success' });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  @ApiParam({
    name: 'id',
    description: 'Farm id',
    example: 'e4b9804f-3f35-472e-9d41-fb29ffc0a483',
  })
  @ApiOkResponse({ description: 'Removed with success' })
  @ApiUnauthorizedResponse({ description: 'No auth token' })
  @ApiForbiddenResponse({ description: 'Not allowed' })
  @ApiBadRequestResponse({ description: 'Invalid or missing data' })
  async remove(@Request() req, @Param() params: ParamsDTO) {
    this.resp = await this.service.remove(params, req.user.id);
    if (!this.resp.affected) throw new ForbiddenException();
    else return ResponseFactory({ message: 'Deleted with success' });
  }
}
