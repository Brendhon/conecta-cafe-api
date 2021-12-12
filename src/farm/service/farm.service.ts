import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParamsDTO } from '../../helpers/common/dto/params.dto';
import { DeleteResult, Repository } from 'typeorm';
import { FarmEntity } from '../model/farm.entity';

@Injectable()
export class FarmService {
  private readonly logger = new Logger(FarmService.name);

  constructor(
    @InjectRepository(FarmEntity)
    private repo: Repository<FarmEntity>,
  ) {}

  async create(farm: FarmEntity, auth: string): Promise<FarmEntity> {
    try {
      farm.coffeeGrowerId = auth;
      return await this.repo.save(farm);
    } catch (error) {
      throw new BadRequestException('Invalid or missing data');
    }
  }

  async findAll(): Promise<FarmEntity[]> {
    try {
      return await this.repo.find({
        select: ['id', 'farm_name', 'coffee', 'address', 'medias'],
        relations: ['address', 'coffee'],
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException('Invalid or missing data');
    }
  }

  async findOne(id: ParamsDTO): Promise<FarmEntity> {
    try {
      // Pegando os dados atuais da fazenda
      const farm = await this.repo.findOne(
        { id: id.id },
        {
          relations: [
            'address',
            'contact',
            'coffee',
            'coffee.special',
            'coffeeGrower',
          ],
        },
      );

      // Removendo atributos do cafeicultor
      if (farm && farm.coffeeGrower) {
        delete farm.coffeeGrower['password']; // Removendo a senha do usuário
        delete farm.coffeeGrower['createDateTime']; // Removendo data de criação
        delete farm.coffeeGrower['lastChangedDateTime']; // Removendo ultima data de alteração
        delete farm.coffeeGrower['id']; // Removendo ID
        delete farm.coffeeGrower['email']; // Removendo email
      }

      // Retornando a fazenda
      return farm;
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException('Invalid or missing data');
    }
  }

  async update(
    id: ParamsDTO,
    newFarm: FarmEntity,
    auth: string,
  ): Promise<FarmEntity> {
    try {
      // Pegando os dados atuais da fazenda
      const getFarmFromDB = await this.repo.findOne(
        { id: id.id, coffeeGrowerId: auth },
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

  async remove(id: ParamsDTO, auth: string): Promise<DeleteResult> {
    try {
      return await this.repo
        .createQueryBuilder()
        .delete()
        .from(FarmEntity)
        .andWhere('coffeeGrowerId = :auth', { auth: auth })
        .andWhere('id = :id', { id: id.id })
        .execute();
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException('Invalid or missing data');
    }
  }
}
