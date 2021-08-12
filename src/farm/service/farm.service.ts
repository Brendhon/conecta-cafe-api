import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { FarmEntity } from '../model/farm.entity';

@Injectable()
export class FarmService {
  private readonly logger = new Logger(FarmService.name);

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
      const getFarmFromDB = await this.repo.findOne(
        { id: id, coffeeGrowerId: auth },
        { relations: ['address', 'contact'] },
      );

      // Verificando se a fazenda existe
      if (getFarmFromDB) {
        await this.repo.merge(getFarmFromDB, newFarm); // Realizando o merge dos novos dados com os dados antigos
        return await this.repo.save(getFarmFromDB); // Salvando os dados
      }
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException('Invalid or missing data');
    }
  }

  async remove(id: string, auth: string): Promise<DeleteResult> {
    try {
      return await this.repo
        .createQueryBuilder()
        .delete()
        .from(FarmEntity)
        .where('coffeeGrowerId = :id', { id: auth })
        .andWhereInIds(id)
        .execute();
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException('Invalid or missing data');
    }
  }
}
