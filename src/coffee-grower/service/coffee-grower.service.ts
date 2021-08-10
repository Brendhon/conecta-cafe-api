import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CoffeeGrowerEntity } from '../model/coffee-grower.entity';

@Injectable()
export class CoffeeGrowerService {
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
      return await this.repo.find();
    } catch (error) {
      throw new BadRequestException('Invalid or missing data');
    }
  }

  async findOne(id: string): Promise<CoffeeGrowerEntity> {
    try {
      return await this.repo.findOne(
        { id },
        { relations: ['farm', 'farm.address', 'farm.contact'] },
      );
    } catch (error) {
      throw new BadRequestException('Invalid or missing data');
    }
  }

  async update(
    id: string,
    newCoffeeGrower: CoffeeGrowerEntity,
  ): Promise<UpdateResult> {
    try {
      return await this.repo.update({ id }, newCoffeeGrower);
    } catch (error) {
      throw new BadRequestException('Invalid or missing data');
    }
  }
  async remove(id: string): Promise<DeleteResult> {
    try {
      return await this.repo.delete({ id });
    } catch (error) {
      throw new BadRequestException('Invalid or missing data');
    }
  }
}
