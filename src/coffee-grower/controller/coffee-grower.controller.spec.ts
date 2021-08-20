import { Test, TestingModule } from '@nestjs/testing';
import { MockConstants, MockFactory } from '../../helpers/mock/common.mock';
import { CoffeeGrowerService } from '../service/coffee-grower.service';
import { CoffeeGrowerController } from './coffee-grower.controller';
import { CoffeeGrowerEntity } from '../model/coffee-grower.entity';

// Realizando o mock do serviço
jest.mock('../service/coffee-grower.service');

describe('Unity test - Coffee Grower', () => {
  const id: any = { user: { id: '' } };
  let controller: CoffeeGrowerController;
  let service: CoffeeGrowerService;
  let mockBody: CoffeeGrowerEntity;
  let mockBodyList: CoffeeGrowerEntity[];
  let mockResp: any;
  let mockFactory: any;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoffeeGrowerController],
      providers: [CoffeeGrowerService],
    }).compile();

    controller = module.get<CoffeeGrowerController>(CoffeeGrowerController);
    service = module.get<CoffeeGrowerService>(CoffeeGrowerService);

    // Inicializando fabrica de objetos mocados
    mockFactory = new MockFactory();

    // Mock - Atributos
    mockBody = mockFactory.create(CoffeeGrowerEntity);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('Create', () => {
    it('should create a coffee grower', async () => {
      // Mock - Param, body, query and response
      mockResp = { ...mockBody, password: null };

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
      mockResp = mockBodyList;

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
      mockResp = mockBody;

      // Mock - function
      jest.spyOn(service, 'findOne').mockResolvedValue(mockResp);

      // Check - se sucesso é verdadeiro
      expect(await controller.findOne(id)).toMatchObject({
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
        .findOne(id)
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
      mockResp = MockConstants.MOCK_UPDATE_SERVICE;

      // Mock - function
      jest.spyOn(service, 'update').mockResolvedValue(mockResp);

      // Check - se sucesso é verdadeiro
      expect(await controller.update(id, mockBody)).toMatchObject({
        success: true,
        data: { message: 'Updated with success' },
        error: {},
      });
    });

    it('should throw NotFoundException if coffee grower not found', async () => {
      // Mock - Param, body, query and response
      mockResp = MockConstants.MOCK_UPDATE_SERVICE;
      mockResp.affected = 0;

      // Mock - function
      jest.spyOn(service, 'update').mockResolvedValue(mockResp);

      // check - Se o controller lançou um erro de 'Not found'
      await controller
        .update(id, mockBody)
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
      mockResp = MockConstants.MOCK_DELETE_SERVICE;

      // Mock - function
      jest.spyOn(service, 'remove').mockResolvedValue(mockResp);

      // Check - se sucesso é verdadeiro
      expect(await controller.remove(id)).toMatchObject({
        success: true,
        data: { message: 'Deleted with success' },
        error: {},
      });
    });

    it('should throw NotFoundException if coffee grower not found', async () => {
      // Mock - Param, body, query and response
      mockResp = MockConstants.MOCK_DELETE_SERVICE;
      mockResp.affected = 0;

      // Mock - function
      jest.spyOn(service, 'remove').mockResolvedValue(mockResp);

      // check - Se o controller lançou um erro de 'Not found'
      await controller
        .remove(id)
        .then((resp) => {
          expect(resp).toBe(undefined);
        })
        .catch((error) => {
          expect(error.status).toBe(403);
        });
    });
  });
});
