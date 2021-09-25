import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CoffeeGrowerEntity } from '../model/coffee-grower.entity';
import { CoffeeGrowerUpdateDTO } from '../dto/coffee-grower.dto';

@Injectable()
export class CoffeeGrowerService {
  private readonly logger = new Logger(CoffeeGrowerService.name);
  constructor(
    @InjectRepository(CoffeeGrowerEntity)
    private repo: Repository<CoffeeGrowerEntity>,
  ) {}

  async create(coffeeGrower: CoffeeGrowerEntity): Promise<CoffeeGrowerEntity> {
    try {
      if (await this.findByEmail(coffeeGrower.email)) return;
      const hash = await bcrypt.hash(coffeeGrower.password, 10); // Não salvar a senha em formato texto
      const resp = await this.repo.save({ ...coffeeGrower, password: hash });
      return { ...resp, password: null };
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException('Invalid or missing data');
    }
  }

  async findAll(): Promise<CoffeeGrowerEntity[]> {
    try {
      return await this.repo.find({
        select: ['email', 'id', 'name'],
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException('Invalid or missing data');
    }
  }

  async findOne(id: string): Promise<CoffeeGrowerEntity> {
    try {
      return await this.repo.findOne(
        { id },
        {
          relations: ['farm', 'farm.address', 'farm.contact'],
          select: ['farm', 'email', 'id', 'name'],
        },
      );
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException('Invalid or missing data');
    }
  }

  async findByEmail(email: string): Promise<CoffeeGrowerEntity> {
    try {
      return await this.repo.findOne(
        { email },
        { relations: ['farm', 'farm.address', 'farm.contact'] },
      );
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException('Invalid or missing data');
    }
  }

  async update(
    id: string,
    grower: CoffeeGrowerUpdateDTO,
  ): Promise<UpdateResult> {
    try {
      if (grower.password) {
        const hash = await bcrypt.hash(grower.password, 10); // Não salvar a senha em formato texto
        return await this.repo.update({ id }, { ...grower, password: hash });
      } else return await this.repo.update({ id }, grower);
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException('Invalid or missing data');
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    try {
      return await this.repo.delete({ id });
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException('Invalid or missing data');
    }
  }
}
