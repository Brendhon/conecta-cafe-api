import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConstantsExample } from '../../helpers/common/constants/example-constants';
import { ResponseModel } from '../../helpers/common/models/response.model';
import { CoffeeGrowerDTO } from '../dto/coffee-grower.dto';
import { CoffeeGrowerService } from '../service/coffee-grower.service';
import { CoffeeGrowerController } from './coffee-grower.controller';

describe('CoffeeGrowerController', () => {
  let app: INestApplication;
  let controller: CoffeeGrowerController;
  let result: ResponseModel;
  let coffeeGrowerExample: CoffeeGrowerDTO;
  let response: any;

  beforeAll(() => {
    result = { success: true, data: [] };
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoffeeGrowerController],
      providers: [
        {
          provide: CoffeeGrowerService,
          useFactory: () => ({
            create: jest.fn(() => result),
          }),
        },
      ],
    }).compile();
    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    controller = module.get<CoffeeGrowerController>(CoffeeGrowerController);
    coffeeGrowerExample = ConstantsExample.COFFEE_GROWER_EXAMPLE;
  });

  describe('Create', () => {
    it('should create a coffee grower', async () => {
      response = await (await controller.create(coffeeGrowerExample)).success;
      expect(response).toBe(true);
    });
  });
});
