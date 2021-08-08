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
      throw new BadRequestException('Invalid or missing data');
    }
  }

  async findAll(): Promise<CoffeeGrowerEntity[]> {
    try {
      return await this.repo.find();
    } catch (error) {
      throw new BadRequestException('Invalid or missing data');
    }
  }

  async findOne(email: string): Promise<CoffeeGrowerEntity> {
    try {
      return await this.repo.findOne({ email: email });
    } catch (error) {
      throw new BadRequestException('Invalid or missing data');
    }
  }

  async update(
    email: string,
    newCoffeeGrower: CoffeeGrowerEntity,
  ): Promise<UpdateResult> {
    try {
      return await this.repo.update({ email: email }, newCoffeeGrower);
    } catch (error) {
      throw new BadRequestException('Invalid or missing data');
    }
  }
  async remove(email: string): Promise<DeleteResult> {
    try {
      return await this.repo.delete({ email: email });
    } catch (error) {
      throw new BadRequestException('Invalid or missing data');
    }
  }
}
