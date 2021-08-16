import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HeaderDTO } from '../../helpers/common/dto/headers.dto';
import { ParamsDTO } from '../../helpers/common/dto/params.dto';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CoffeeGrowerEntity } from '../model/coffee-grower.entity';

@Injectable()
export class CoffeeGrowerService {
  private readonly logger = new Logger(CoffeeGrowerService.name);
  constructor(
    @InjectRepository(CoffeeGrowerEntity)
    private repo: Repository<CoffeeGrowerEntity>,
  ) {}

  async create(coffeeGrower: CoffeeGrowerEntity): Promise<CoffeeGrowerEntity> {
    try {
      return await this.repo.save(coffeeGrower);
    } catch (error) {
      throw new BadRequestException(
        'Invalid, missing data or Coffee Grower already exist',
      );
    }
  }

  async findAll(): Promise<CoffeeGrowerEntity[]> {
    try {
      return await this.repo.find({
        relations: ['farm', 'farm.address', 'farm.contact'],
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException('Invalid or missing data');
    }
  }

  async findOne(id: ParamsDTO): Promise<CoffeeGrowerEntity> {
    try {
      return await this.repo.findOne(
        { id: id.id },
        { relations: ['farm', 'farm.address', 'farm.contact'] },
      );
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException('Invalid or missing data');
    }
  }

  async update(
    auth: HeaderDTO,
    newCoffeeGrower: CoffeeGrowerEntity,
  ): Promise<UpdateResult> {
    try {
      return await this.repo.update(
        { id: auth.authorization },
        newCoffeeGrower,
      );
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException('Invalid or missing data');
    }
  }

  async remove(auth: HeaderDTO): Promise<DeleteResult> {
    try {
      return await this.repo.delete({ id: auth.authorization });
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException('Invalid or missing data');
    }
  }
}
