import { Test, TestingModule } from '@nestjs/testing';
import { CoffeeGrowerController } from './coffee-grower.controller';

describe('CoffeeGrowerController', () => {
  let controller: CoffeeGrowerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoffeeGrowerController],
    }).compile();

    controller = module.get<CoffeeGrowerController>(CoffeeGrowerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
