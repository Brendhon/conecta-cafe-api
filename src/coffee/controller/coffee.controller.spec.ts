import { Test, TestingModule } from '@nestjs/testing';
import { MockConstants, MockFactory } from '../../helpers/mock/common.mock';
import { ParamsDTO } from '../../helpers/common/dto/params.dto';
import { CoffeeService } from '../service/coffee.service';
import { CoffeeController } from './coffee.controller';
import { CoffeeEntity } from '../model/coffee.entity';

// Realizando o mock do serviço
jest.mock('../service/coffee.service');

describe('CoffeeController', () => {
  const id: any = { user: { id: '' } };
  let controller: CoffeeController;
  let service: CoffeeService;
  let mockParams: ParamsDTO;
  let mockBody: CoffeeEntity;
  let mockBodyList: CoffeeEntity[];
  let mockResp: any;
  let mockFactory: any;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoffeeController],
      providers: [CoffeeService],
    }).compile();

    // Mock - Serviço e repositórios
    controller = module.get<CoffeeController>(CoffeeController);
    service = module.get<CoffeeService>(CoffeeService);

    // Inicializando fabrica de objetos mocados
    mockFactory = new MockFactory();

    // Mock - Atributos
    mockParams = mockFactory.create(ParamsDTO);
    mockBody = mockFactory.create(CoffeeEntity);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('Create', () => {
    it('should create a coffee', async () => {
      // Mock response
      mockResp = mockBody;

      // Mock - function
      jest.spyOn(service, 'create').mockResolvedValue(mockResp);

      // Check - se sucesso é verdadeiro
      expect(await controller.create(id, mockBody, mockParams)).toMatchObject({
        success: true,
        data: mockResp,
        error: {},
      });
    });

    it('should throw ForbiddenException', async () => {
      // Mock - Param, body, query and response
      mockResp = undefined;

      // Mock - function
      jest.spyOn(service, 'create').mockResolvedValue(mockResp);

      // check - Se o controller lançou um erro
      await controller
        .create(id, mockBody, mockParams)
        .then((resp) => {
          expect(resp).toBe(undefined);
        })
        .catch((error) => {
          expect(error.status).toBe(403);
        });
    });
  });

  describe('Find All', () => {
    it('should list all coffees', async () => {
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
    it('should list a coffee', async () => {
      // Mock - Param, body, query and response
      mockResp = mockBody;

      // Mock - function
      jest.spyOn(service, 'find').mockResolvedValue(mockResp);

      // Check - se sucesso é verdadeiro
      expect(await controller.find(mockParams)).toMatchObject({
        success: true,
        data: mockResp,
        error: {},
      });
    });
  });

  describe('Update', () => {
    // Atributos em comum
    mockBody = mockBody;

    it('should update a coffee', async () => {
      // Mock - Param, body, query and response
      mockResp = MockConstants.MOCK_UPDATE_SERVICE;

      // Mock - function
      jest.spyOn(service, 'update').mockResolvedValue(mockResp);

      // Check - se sucesso é verdadeiro
      expect(await controller.update(id, mockParams, mockBody)).toMatchObject({
        success: true,
        data: { message: 'Updated with success' },
        error: {},
      });
    });

    it('should throw ForbiddenException', async () => {
      // Mock - Param, body, query and response
      mockResp = undefined;

      // Mock - function
      jest.spyOn(service, 'update').mockResolvedValue(mockResp);

      // check - Se o controller lançou um erro
      await controller
        .update(id, mockParams, mockBody)
        .then((resp) => {
          expect(resp).toBe(undefined);
        })
        .catch((error) => {
          expect(error.status).toBe(403);
        });
    });
  });

  describe('Remove', () => {
    it('should delete a coffee', async () => {
      // Mock - Param, body, query and response
      mockResp = MockConstants.MOCK_DELETE_SERVICE;

      // Mock - function
      jest.spyOn(service, 'remove').mockResolvedValue(mockResp);

      // Check - se sucesso é verdadeiro
      expect(await controller.remove(id, mockParams)).toMatchObject({
        success: true,
        data: { message: 'Deleted with success' },
        error: {},
      });
    });

    it('should throw ForbiddenException', async () => {
      // Mock - Param, body, query and response
      mockResp = undefined;

      // Mock - function
      jest.spyOn(service, 'remove').mockResolvedValue(mockResp);

      // check - Se o controller lançou um erro
      await controller
        .remove(id, mockParams)
        .then((resp) => {
          expect(resp).toBe(undefined);
        })
        .catch((error) => {
          expect(error.status).toBe(403);
        });
    });
  });
});
