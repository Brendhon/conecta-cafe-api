import { Test, TestingModule } from '@nestjs/testing';
import { FarmController } from './farm.controller';
import { FarmService } from '../service/farm.service';
import { HeaderDTO } from '../../helpers/common/dto/headers.dto';
import { ParamsDTO } from '../../helpers/common/dto/params.dto';
import { MockConstants, MockFactory } from '../../helpers/mock/common.mock';
import { FarmEntity } from '../model/farm.entity';

// Realizando o mock do serviço
jest.mock('../service/farm.service');

describe('FarmController', () => {
  let controller: FarmController;
  let service: FarmService;
  let mockParams: ParamsDTO;
  let mockHeaders: HeaderDTO;
  let mockBody: any;
  let mockBodyList: FarmEntity[];
  let mockResp: any;
  let mockFactory: any;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FarmController],
      providers: [FarmService],
    }).compile();

    controller = module.get<FarmController>(FarmController);
    service = module.get<FarmService>(FarmService);

    // Inicializando fabrica de objetos mocados
    mockFactory = new MockFactory();

    // Mock - Atributos
    mockParams = mockFactory.create(ParamsDTO);
    mockHeaders = mockFactory.create(HeaderDTO);
    mockBody = mockFactory.create(FarmEntity);
    mockBodyList = [];
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('Create', () => {
    it('should create a farm', async () => {
      // Mock - Param, body, query and response
      mockResp = mockBody;

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
    it('should list a farm', async () => {
      // Mock - Param, body, query and response
      mockResp = mockBody;

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

      // check - Se o controller lançou um erro
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
      mockResp = MockConstants.MOCK_UPDATE_SERVICE;
      mockBody = mockBody;

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

    it('should throw ForbiddenException', async () => {
      // Mock - Param, body, query and response
      mockResp = undefined;
      mockBody = mockBody;

      // Mock - function
      jest.spyOn(service, 'update').mockResolvedValue(mockResp);

      // check - Se o controller lançou um erro
      await controller
        .update(mockHeaders, mockParams, mockBody)
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
      expect(await controller.remove(mockHeaders, mockParams)).toMatchObject({
        success: true,
        data: { message: 'Deleted with success' },
        error: {},
      });
    });

    it('should throw ForbiddenException', async () => {
      // Mock - Param, body, query and response
      mockResp = MockConstants.MOCK_DELETE_SERVICE;
      mockResp.affected = 0;

      // Mock - function
      jest.spyOn(service, 'remove').mockResolvedValue(mockResp);

      // check - Se o controller lançou um erro
      await controller
        .remove(mockHeaders, mockParams)
        .then((resp) => {
          expect(resp).toBe(undefined);
        })
        .catch((error) => {
          expect(error.status).toBe(403);
        });
    });
  });
});
