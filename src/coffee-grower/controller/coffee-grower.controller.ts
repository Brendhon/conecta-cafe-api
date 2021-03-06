import {
  Body,
  ConflictException,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import ResponseFactory from '../../helpers/factory/response-factory';

import {
  CoffeeGrowerDTO,
  CoffeeGrowerUpdateDTO,
} from '../dto/coffee-grower.dto';
import { CoffeeGrowerService } from '../service/coffee-grower.service';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';

@ApiTags('Coffee grower')
@Controller('coffee-grower')
export class CoffeeGrowerController {
  private resp: any;

  constructor(private service: CoffeeGrowerService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Create with success' })
  @ApiConflictResponse({ description: 'Coffee Grower already exist' })
  @ApiBadRequestResponse({ description: 'Invalid or missing data' })
  async create(@Body() body: CoffeeGrowerDTO) {
    this.resp = await this.service.create(body);
    if (!this.resp) throw new ConflictException('Coffee Grower already exist');
    else return ResponseFactory(this.resp);
  }

  @Get('all')
  @ApiOkResponse({ description: 'Return all coffee grower' })
  @ApiBadRequestResponse({ description: 'Invalid or missing data' })
  async findAll() {
    this.resp = await this.service.findAll();
    return ResponseFactory(this.resp);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Return a specific coffee grower' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiUnauthorizedResponse({ description: 'No auth token' })
  @ApiBadRequestResponse({ description: 'Invalid or missing data' })
  async findOne(@Request() req) {
    this.resp = await this.service.findOne(req.user.id);
    if (!this.resp) throw new NotFoundException();
    else return ResponseFactory(this.resp);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Updated with success' })
  @ApiForbiddenResponse({ description: 'Not allowed' })
  @ApiUnauthorizedResponse({ description: 'No auth token' })
  @ApiBadRequestResponse({ description: 'Invalid or missing data' })
  async update(@Request() req, @Body() body: CoffeeGrowerUpdateDTO) {
    this.resp = await this.service.update(req.user.id, body);
    if (!this.resp.affected) throw new ForbiddenException();
    else return ResponseFactory({ message: 'Updated with success' });
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Removed with success' })
  @ApiForbiddenResponse({ description: 'Not allowed' })
  @ApiUnauthorizedResponse({ description: 'No auth token' })
  @ApiBadRequestResponse({ description: 'Invalid or missing data' })
  async remove(@Request() req) {
    this.resp = await this.service.remove(req.user.id);
    if (!this.resp.affected) throw new ForbiddenException();
    else return ResponseFactory({ message: 'Deleted with success' });
  }
}
