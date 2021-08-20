import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
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
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ParamsDTO } from '../../helpers/common/dto/params.dto';
import ResponseFactory from '../../helpers/factory/response-factory';
import { CoffeeDTO } from '../dto/coffee.dto';
import { CoffeeService } from '../service/coffee.service';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';

@ApiTags('Coffee')
@Controller('coffee')
export class CoffeeController {
  private resp: any;

  constructor(private coffeeService: CoffeeService) {}

  @Post(':id')
  @UseGuards(JwtAuthGuard)
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
  @ApiUnauthorizedResponse({ description: 'No auth token' })
  @ApiForbiddenResponse({ description: 'Not allowed' })
  @ApiBadRequestResponse({ description: 'Invalid or missing data' })
  async create(
    @Request() req,
    @Body() body: CoffeeDTO,
    @Param() params: ParamsDTO,
  ) {
    this.resp = await this.coffeeService.create(body, params, req.user.id);
    if (!this.resp) throw new ForbiddenException();
    return ResponseFactory(this.resp);
  }

  @Get('all')
  @ApiOkResponse({ description: 'Return all coffees' })
  @ApiBadRequestResponse({ description: 'Invalid or missing data' })
  async findAll() {
    this.resp = await this.coffeeService.findAll();
    return ResponseFactory(this.resp);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'Farm id',
    example: '653a410a-cda7-4043-8fe7-fb5426eaeb29',
  })
  @ApiOkResponse({ description: 'Returns all coffees belonging to a farm' })
  @ApiBadRequestResponse({ description: 'Invalid or missing data' })
  async find(@Param() params: ParamsDTO) {
    this.resp = await this.coffeeService.find(params);
    return ResponseFactory(this.resp);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
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
  @ApiUnauthorizedResponse({ description: 'No auth token' })
  @ApiOkResponse({ description: 'Updated with success' })
  @ApiForbiddenResponse({ description: 'Not allowed' })
  @ApiBadRequestResponse({ description: 'Invalid or missing data' })
  async update(
    @Request() req,
    @Param() params: ParamsDTO,
    @Body() body: CoffeeDTO,
  ) {
    this.resp = await this.coffeeService.update(params, body, req.user.id);
    if (!this.resp) throw new ForbiddenException();
    else return ResponseFactory({ message: 'Updated with success' });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
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
  @ApiUnauthorizedResponse({ description: 'No auth token' })
  @ApiOkResponse({ description: 'Removed with success' })
  @ApiForbiddenResponse({ description: 'Not allowed' })
  @ApiBadRequestResponse({ description: 'Invalid or missing data' })
  async remove(@Request() req, @Param() params: ParamsDTO) {
    this.resp = await this.coffeeService.remove(params, req.user.id);
    if (!this.resp) throw new ForbiddenException();
    return ResponseFactory({ message: 'Deleted with success' });
  }
}
