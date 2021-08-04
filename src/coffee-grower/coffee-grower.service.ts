import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import ResponseFactory from 'src/factory/response-factory';
import { CoffeeGrowerEntity } from 'src/models/coffee-grower.entity';
import { ResponseModel } from 'src/models/response.model';

@Injectable()
export class CoffeeGrowerService {
  constructor(
    @InjectRepository(CoffeeGrowerEntity)
    private repository: Repository<CoffeeGrowerEntity>,
  ) {}

  getAll(): Promise<ResponseModel> {
    return this.repository
      .find()
      .then((resp) => ResponseFactory(resp, 200))
      .catch((error) => ResponseFactory(error.detail, 400, error.detail));
  }

  create(coffeeGrower: CoffeeGrowerEntity): Promise<ResponseModel> {
    return this.repository
      .save(coffeeGrower)
      .then(() => ResponseFactory({ message: 'Create with success' }, 201))
      .catch((error) => ResponseFactory(error.detail, 400, error.detail));
  }
}
