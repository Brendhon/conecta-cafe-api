import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FarmEntity } from '../model/farm.entity';

@Injectable()
export class FarmService {
  constructor(
    @InjectRepository(FarmEntity)
    private repo: Repository<FarmEntity>,
  ) {}

  async create(farm: FarmEntity, responsibleGrower: any): Promise<FarmEntity> {
    try {
      farm.coffeeGrowerId = responsibleGrower;
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

  async findOne(id: string): Promise<FarmEntity> {
    try {
      return await this.repo.findOne(
        { id },
        { relations: ['address', 'contact'] },
      );
    } catch (error) {
      throw new BadRequestException('Invalid or missing data');
    }
  }

  async update(
    id: any,
    newFarm: FarmEntity,
    auth: string,
  ): Promise<FarmEntity> {
    try {
      // Pegando os dados atuais da fazenda
      const getFarmFromDB = await this.findOne(id);

      // Verificando se a fazenda existe
      if (!getFarmFromDB) return getFarmFromDB;

      // Verificando se a fazenda pertence ao cafeicultor responsável
      if (getFarmFromDB.coffeeGrowerId !== auth) throw new ForbiddenException();

      // Realizando o merge dos novos dados com os dados antigos
      await this.repo.merge(getFarmFromDB, newFarm);

      // Salvando os dados
      return await this.repo.save(getFarmFromDB);
    } catch (error) {
      throw error;
    }
  }
  /**
  async remove(id: string): Promise<DeleteResult> {
    try {
      return await this.repo.delete({ id });
    } catch (error) {
      throw new BadRequestException('Invalid or missing data');
    }
  }
  */
}
