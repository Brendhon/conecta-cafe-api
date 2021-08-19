import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HeaderDTO } from '../../helpers/common/dto/headers.dto';
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
      const hash = await bcrypt.hash(coffeeGrower.password, 10); // Não salvar a senha em formato texto
      const resp = await this.repo.save({ ...coffeeGrower, password: hash });
      return { ...resp, password: null };
    } catch (error) {
      throw new BadRequestException(
        'Invalid, missing data or Coffee Grower already exist',
      );
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
        { id: id },
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
    auth: any,
    newCoffeeGrower: CoffeeGrowerUpdateDTO,
  ): Promise<UpdateResult> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = newCoffeeGrower; // Ignorando senha para não atualiza-lá no banco
      return await this.repo.update({ id: auth }, rest);
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
