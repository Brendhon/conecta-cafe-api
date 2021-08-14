import { Repository } from 'typeorm';
import { MockFarm } from './farm.mock';

/* const offsetSpy = jest.fn().mockReturnThis();
const limitSpy = jest.fn().mockReturnThis();
const getManyAndCountSpy = jest.fn().mockReturnValueOnce(<expected response>); */

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
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
      execute: jest.fn().mockReturnValue(MockFarm.SERVICE_TO_DELETE),
    })),
  }),
);

export type MockType<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [P in keyof T]: jest.Mock<{}>;
};
