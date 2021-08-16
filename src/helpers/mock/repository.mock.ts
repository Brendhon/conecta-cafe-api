/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CoffeeGrowerEntity } from '../../coffee-grower/model/coffee-grower.entity';
import { Repository } from 'typeorm';
import { MockConstants } from './common.mock';
import { FarmEntity } from '../../farm/model/farm.entity';
import { CoffeeEntity } from '../../coffee/model/coffee.entity';

// @ts-ignore
export const farmRepositoryMockFactory: () => MockType<Repository<FarmEntity>> =
  jest.fn(() => ({
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    merge: jest.fn(),
    createQueryBuilder: jest.fn(() => ({
      delete: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      execute: jest.fn().mockReturnValue(MockConstants.MOCK_DELETE_SERVICE),
    })),
  }));

// @ts-ignore
export const growerRepositoryMockFactory: () => MockType<
  Repository<CoffeeGrowerEntity>
> = jest.fn(() => ({
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
}));

// @ts-ignore
export const coffeeRepositoryMockFactory: () => MockType<Repository<any>> =
  jest.fn(() => ({
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    merge: jest.fn(),
    createQueryBuilder: jest.fn(() => ({
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      innerJoin: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getOne: jest.fn().mockReturnValue(new CoffeeEntity()),
    })),
  }));

export type MockType<T> = {
  [P in keyof T]: jest.Mock<{}>;
};
