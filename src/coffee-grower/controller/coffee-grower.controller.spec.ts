import { Test, TestingModule } from '@nestjs/testing';
import { HeaderDTO } from '../../helpers/common/dto/headers.dto';
import { ParamsDTO } from '../../helpers/common/dto/params.dto';
import { MockCoffeeGrower } from '../../helpers/mock/coffee-grower.mock';
import { CoffeeGrowerService } from '../service/coffee-grower.service';
import { CoffeeGrowerController } from './coffee-grower.controller';

// Realizando o mock do serviço
jest.mock('../service/coffee-grower.service');

describe('Unity test - Coffee Grower', () => {
  let controller: CoffeeGrowerController;
  let service: CoffeeGrowerService;
  let mockParams: ParamsDTO;
  let mockHeaders: HeaderDTO;
  let mockBody: any;
  let mockResp: any;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoffeeGrowerController],
      providers: [CoffeeGrowerService],
    }).compile();

    controller = module.get<CoffeeGrowerController>(CoffeeGrowerController);
    service = module.get<CoffeeGrowerService>(CoffeeGrowerService);
    mockParams = { id: '' };
    mockHeaders = MockCoffeeGrower.HEADERS;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('Create', () => {
    it('should create a coffee grower', async () => {
      // Mock - Param, body, query and response
      mockResp = MockCoffeeGrower.BODY;
      mockBody = MockCoffeeGrower.BODY;

      // Mock - function
      jest.spyOn(service, 'create').mockResolvedValue(mockResp);

      // Check - se sucesso é verdadeiro
      expect(await controller.create(mockBody)).toMatchObject({
        success: true,
        data: mockResp,
        error: {},
      });
    });
  });

  describe('Find All', () => {
    it('should list all coffee grower', async () => {
      // Mock - Param, body, query and response
      mockResp = MockCoffeeGrower.SERVICE_TO_FIND_ALL;

      // Mock - function
      jest.spyOn(service, 'findAll').mockResolvedValue(mockResp);

      // Check - se sucesso é verdadeiro
      expect(await controller.findAll()).toMatchObject({
        success: true,
        data: mockResp,
        error: {},
      });
    });
  });

  describe('Find One', () => {
    it('should list a coffee grower', async () => {
      // Mock - Param, body, query and response
      mockResp = MockCoffeeGrower.SERVICE_TO_FIND_ONE;

      // Mock - function
      jest.spyOn(service, 'findOne').mockResolvedValue(mockResp);

      // Check - se sucesso é verdadeiro
      expect(await controller.findOne(mockParams)).toMatchObject({
        success: true,
        data: mockResp,
        error: {},
      });
    });

    it('should throw NotFoundException if coffee grower not found', async () => {
      // Mock - Param, body, query and response
      mockResp = undefined;

      // Mock - function
      jest.spyOn(service, 'findOne').mockResolvedValue(mockResp);

      // check - Se o controller lançou um erro de 'Not found'
      await controller
        .findOne(mockParams)
        .then((resp) => {
          expect(resp).toBe(undefined);
        })
        .catch((error) => {
          expect(error.status).toBe(404);
        });
    });
  });

  describe('Update', () => {
    it('should update a coffee grower', async () => {
      // Mock - Param, body, query and response
      mockResp = MockCoffeeGrower.SERVICE_TO_UPDATE;
      mockBody = MockCoffeeGrower.BODY;

      // Mock - function
      jest.spyOn(service, 'update').mockResolvedValue(mockResp);

      // Check - se sucesso é verdadeiro
      expect(await controller.update(mockHeaders, mockBody)).toMatchObject({
        success: true,
        data: { message: 'Updated with success' },
        error: {},
      });
    });

    it('should throw NotFoundException if coffee grower not found', async () => {
      // Mock - Param, body, query and response
      mockResp = MockCoffeeGrower.SERVICE_TO_UPDATE;
      mockResp.affected = 0;
      mockBody = MockCoffeeGrower.BODY;

      // Mock - function
      jest.spyOn(service, 'update').mockResolvedValue(mockResp);

      // check - Se o controller lançou um erro de 'Not found'
      await controller
        .update(mockHeaders, mockBody)
        .then((resp) => {
          expect(resp).toBe(undefined);
        })
        .catch((error) => {
          expect(error.status).toBe(403);
        });
    });
  });

  describe('Remove', () => {
    it('should delete a coffee grower', async () => {
      // Mock - Param, body, query and response
      mockResp = MockCoffeeGrower.SERVICE_TO_DELETE;

      // Mock - function
      jest.spyOn(service, 'remove').mockResolvedValue(mockResp);

      // Check - se sucesso é verdadeiro
      expect(await controller.remove(mockHeaders)).toMatchObject({
        success: true,
        data: { message: 'Deleted with success' },
        error: {},
      });
    });

    it('should throw NotFoundException if coffee grower not found', async () => {
      // Mock - Param, body, query and response
      mockResp = MockCoffeeGrower.SERVICE_TO_DELETE;
      mockResp.affected = 0;

      // Mock - function
      jest.spyOn(service, 'remove').mockResolvedValue(mockResp);

      // check - Se o controller lançou um erro de 'Not found'
      await controller
        .remove(mockHeaders)
        .then((resp) => {
          expect(resp).toBe(undefined);
        })
        .catch((error) => {
          expect(error.status).toBe(403);
        });
    });
  });
});
