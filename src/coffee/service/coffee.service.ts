import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoffeeGrowerEntity } from '../../coffee-grower/model/coffee-grower.entity';
import { FarmDTO } from '../../farm/dto/farm.dto';
import { FarmEntity } from '../../farm/model/farm.entity';
import { FarmService } from '../../farm/service/farm.service';
import { Repository } from 'typeorm';
import { CoffeeEntity } from '../model/coffee.entity';

@Injectable()
export class CoffeeService {
  private readonly logger = new Logger(CoffeeService.name);

  constructor(
    @InjectRepository(CoffeeEntity)
    private repo: Repository<CoffeeEntity>,
    private farmService: FarmService,
  ) {}

  async create(coffee: CoffeeEntity, id: string, auth: string): Promise<any> {
    try {
      // Buscando os dados da fazenda responsável
      const result: FarmDTO = await this.farmService.findOne(id);

      // Verificando se a cafeicultor responsável pela fazenda é o mesmo passado
      if (result && result.coffeeGrowerId == auth) {
        coffee.farmId = id;
        return await this.repo.save(coffee);
      }
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException('Invalid, missing data');
    }
  }

  async findAll(): Promise<CoffeeEntity[]> {
    try {
      return await this.repo.find({ relations: ['special'] });
    } catch (error) {
      throw new BadRequestException('Invalid or missing data');
    }
  }

  async findOne(id: string): Promise<CoffeeEntity> {
    try {
      return await this.repo.findOne({ id }, { relations: ['special'] });
    } catch (error) {
      throw new BadRequestException('Invalid or missing data');
    }
  }

  async update(id: any, newData: CoffeeEntity, auth: string): Promise<any> {
    try {
      const getCoffeeFromDB = await this.repo
        .createQueryBuilder('coffee')
        .leftJoinAndSelect('coffee.special', 'special') // Relacionando os dados da tabela special com coffee
        .innerJoin(FarmEntity, 'farm', 'coffee.farmId = farm.id')
        .innerJoin(CoffeeGrowerEntity, 'cg', 'farm.coffeeGrowerId = cg.id') // Pegando os dados do cafeicultor para verificar se fazenda dona desse café pertence a ele
        .andWhere('cg.id = :auth', { auth: auth }) // Verificando se o token de autorização passado pertence ao cafeicultor dono desse café
        .andWhere('coffee.id = :id', { id: id })
        .getOne();

      // Verificando se a fazenda existe
      if (getCoffeeFromDB) {
        await this.repo.merge(getCoffeeFromDB, newData); // Realizando o merge dos novos dados com os dados antigos
        return await this.repo.save(getCoffeeFromDB); // Salvando os dados
      }
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException('Invalid or missing data');
    }
  }

  async remove(id: string, auth: string): Promise<CoffeeEntity> {
    try {
      const getCoffeeFromDB = await this.repo
        .createQueryBuilder('coffee')
        .leftJoinAndSelect('coffee.special', 'special') // Relacionando os dados da tabela special com coffee
        .innerJoin(FarmEntity, 'farm', 'coffee.farmId = farm.id')
        .innerJoin(CoffeeGrowerEntity, 'cg', 'farm.coffeeGrowerId = cg.id') // Pegando os dados do cafeicultor para verificar se fazenda dona desse café pertence a ele
        .andWhere('cg.id = :auth', { auth: auth }) // Verificando se o token de autorização passado pertence ao cafeicultor dono desse café
        .andWhere('coffee.id = :id', { id: id })
        .getOne();

      if (getCoffeeFromDB) {
        return await this.repo.remove(getCoffeeFromDB);
      }
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException('Invalid or missing data');
    }
  }
}
