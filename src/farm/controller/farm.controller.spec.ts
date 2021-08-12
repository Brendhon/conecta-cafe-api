import { Test, TestingModule } from '@nestjs/testing';
import { FarmController } from './farm.controller';
import { FarmService } from '../service/farm.service';
import { HeaderDTO } from '../dto/headers.dto';
import { GetOneParams } from '../dto/farm.dto';
import { MockFarm } from '../../helpers/mock/farm.mock';

// Realizando o mock do serviço
jest.mock('../service/farm.service');

describe('FarmController', () => {
  let controller: FarmController;
  let service: FarmService;
  let mockParams: GetOneParams;
  let mockHeaders: HeaderDTO;
  let mockBody: any;
  let mockResp: any;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FarmController],
      providers: [FarmService],
    }).compile();

    controller = module.get<FarmController>(FarmController);
    service = module.get<FarmService>(FarmService);
    mockParams = { id: '' };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('Create', () => {
    it('should create a farm', async () => {
      // Mock - Param, body, query and response
      mockResp = MockFarm.SERVICE_TO_CREATE;
      mockBody = MockFarm.BODY;
      mockHeaders = MockFarm.HEADERS;

      // Mock - function
      jest.spyOn(service, 'create').mockResolvedValue(mockResp);

      // Check - se sucesso é verdadeiro
      expect(await controller.create(mockBody, mockHeaders)).toMatchObject({
        success: true,
        data: mockResp,
        error: {},
      });
    });
  });

  describe('Find All', () => {
    it('should list all farm', async () => {
      // Mock - Param, body, query and response
      mockResp = MockFarm.SERVICE_TO_FIND_ALL;

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
    it('should list a farm', async () => {
      // Mock - Param, body, query and response
      mockResp = MockFarm.SERVICE_TO_FIND_ONE;

      // Mock - function
      jest.spyOn(service, 'findOne').mockResolvedValue(mockResp);

      // Check - se sucesso é verdadeiro
      expect(await controller.findOne(mockParams)).toMatchObject({
        success: true,
        data: mockResp,
        error: {},
      });
    });

    it('should throw NotFoundException', async () => {
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
      mockResp = MockFarm.SERVICE_TO_UPDATE;
      mockBody = MockFarm.BODY;

      // Mock - function
      jest.spyOn(service, 'update').mockResolvedValue(mockResp);

      // Check - se sucesso é verdadeiro
      expect(
        await controller.update(mockHeaders, mockParams, mockBody),
      ).toMatchObject({
        success: true,
        data: { message: 'Updated with success' },
        error: {},
      });
    });

    it('should throw NotFoundException if coffee grower not found', async () => {
      // Mock - Param, body, query and response
      mockResp = undefined;
      mockBody = MockFarm.BODY;

      // Mock - function
      jest.spyOn(service, 'update').mockResolvedValue(mockResp);

      // check - Se o controller lançou um erro de 'Not found'
      await controller
        .update(mockHeaders, mockParams, mockBody)
        .then((resp) => {
          expect(resp).toBe(undefined);
        })
        .catch((error) => {
          expect(error.status).toBe(404);
        });
    });
  });

  describe('Remove', () => {
    it('should delete a coffee grower', async () => {
      // Mock - Param, body, query and response
      mockResp = MockFarm.SERVICE_TO_DELETE;

      // Mock - function
      jest.spyOn(service, 'remove').mockResolvedValue(mockResp);

      // Check - se sucesso é verdadeiro
      expect(await controller.remove(mockHeaders, mockParams)).toMatchObject({
        success: true,
        data: { message: 'Deleted with success' },
        error: {},
      });
    });

    it('should throw NotFoundException if coffee grower not found', async () => {
      // Mock - Param, body, query and response
      mockResp = MockFarm.SERVICE_TO_DELETE;
      mockResp.affected = 0;

      // Mock - function
      jest.spyOn(service, 'remove').mockResolvedValue(mockResp);

      // check - Se o controller lançou um erro de 'Not found'
      await controller
        .remove(mockHeaders, mockParams)
        .then((resp) => {
          expect(resp).toBe(undefined);
        })
        .catch((error) => {
          expect(error.status).toBe(404);
        });
    });
  });
});
