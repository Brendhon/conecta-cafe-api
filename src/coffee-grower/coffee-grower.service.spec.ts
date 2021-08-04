import { Test, TestingModule } from '@nestjs/testing';
import { CoffeeGrowerService } from './coffee-grower.service';

describe('CoffeeGrowerService', () => {
  let service: CoffeeGrowerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoffeeGrowerService],
    }).compile();

    service = module.get<CoffeeGrowerService>(CoffeeGrowerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
