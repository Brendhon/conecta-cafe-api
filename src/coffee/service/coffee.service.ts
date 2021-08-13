import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CoffeeEntity } from '../model/coffee.entity';

@Injectable()
export class CoffeeService {
  private readonly logger = new Logger(CoffeeService.name);

  constructor(
    @InjectRepository(CoffeeEntity)
    private repo: Repository<CoffeeEntity>,
  ) {}

  async create(coffee: CoffeeEntity, id: string): Promise<CoffeeEntity> {
    try {
      coffee.farmId = id;
      return await this.repo.save(coffee);
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException('Invalid, missing data');
    }
  }
}
