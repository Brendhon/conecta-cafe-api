import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FarmEntity } from '../model/farm.entity';

@Injectable()
export class FarmService {
  constructor(
    @InjectRepository(FarmEntity)
    private repo: Repository<FarmEntity>,
  ) {}

  async create(farm: FarmEntity): Promise<FarmEntity> {
    try {
      return await this.repo.save(farm);
    } catch (error) {
      throw new BadRequestException('Invalid or missing data');
    }
  }

  async findAll(): Promise<FarmEntity[]> {
    try {
      return await this.repo.find({ relations: ['address', 'contact'] });
    } catch (error) {
      throw new BadRequestException('Invalid or missing data');
    }
  }
}
