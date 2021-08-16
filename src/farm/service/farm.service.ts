import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParamsDTO } from '../../helpers/common/dto/params.dto';
import { DeleteResult, Repository } from 'typeorm';
import { FarmEntity } from '../model/farm.entity';
import { HeaderDTO } from '../../helpers/common/dto/headers.dto';

@Injectable()
export class FarmService {
  private readonly logger = new Logger(FarmService.name);

  constructor(
    @InjectRepository(FarmEntity)
    private repo: Repository<FarmEntity>,
  ) {}

  async create(farm: FarmEntity, auth: HeaderDTO): Promise<FarmEntity> {
    try {
      farm.coffeeGrowerId = auth.authorization;
      return await this.repo.save(farm);
    } catch (error) {
      throw new BadRequestException('Invalid or missing data');
    }
  }

  async findAll(): Promise<FarmEntity[]> {
    try {
      return await this.repo.find({
        relations: ['address', 'contact', 'coffee'],
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException('Invalid or missing data');
    }
  }

  async findOne(id: ParamsDTO): Promise<FarmEntity> {
    try {
      return await this.repo.findOne(
        { id: id.id },
        { relations: ['address', 'contact', 'coffee', 'coffee.special'] },
      );
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException('Invalid or missing data');
    }
  }

  async update(
    id: ParamsDTO,
    newFarm: FarmEntity,
    auth: HeaderDTO,
  ): Promise<FarmEntity> {
    try {
      // Pegando os dados atuais da fazenda
      const getFarmFromDB = await this.repo.findOne(
        { id: id.id, coffeeGrowerId: auth.authorization },
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

  async remove(id: ParamsDTO, auth: HeaderDTO): Promise<DeleteResult> {
    try {
      return await this.repo
        .createQueryBuilder()
        .delete()
        .from(FarmEntity)
        .andWhere('coffeeGrowerId = :auth', { auth: auth.authorization })
        .andWhere('id = :id', { id: id.id })
        .execute();
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException('Invalid or missing data');
    }
  }
}
