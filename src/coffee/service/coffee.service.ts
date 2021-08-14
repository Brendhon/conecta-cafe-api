import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
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

  async update(id: any, newData: CoffeeEntity): Promise<CoffeeEntity> {
    try {
      // Pegando os dados atuais da fazenda
      const getCoffeeFromDB = await this.repo.findOne(
        { id: id },
        { relations: ['special'] },
      );

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

  async remove(id: string): Promise<DeleteResult> {
    try {
      return await this.repo.delete({ id });
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException('Invalid or missing data');
    }
  }
}
