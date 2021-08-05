import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CoffeeGrowerEntity } from '../model/coffee-grower.entity';
import { ResponseModel } from '../../helpers/common/models/response.model';
import ResponseFactory from '../../helpers/factory/response-factory';

@Injectable()
export class CoffeeGrowerService {
  constructor(
    @InjectRepository(CoffeeGrowerEntity)
    private repository: Repository<CoffeeGrowerEntity>,
  ) {}

  getAll(): Promise<ResponseModel> {
    return this.repository
      .find()
      .then((resp) => ResponseFactory(resp))
      .catch((error) => {
        throw new BadRequestException(error.detail);
      });
  }

  create(coffeeGrower: CoffeeGrowerEntity): Promise<ResponseModel> {
    return this.repository
      .save(coffeeGrower)
      .then(() => ResponseFactory({ message: 'Create with success' }))
      .catch((error) => {
        throw new BadRequestException(error.detail);
      });
  }
}
