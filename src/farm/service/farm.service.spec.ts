import { Test, TestingModule } from '@nestjs/testing';
import {
  MockType,
  repositoryMockFactory,
} from '../../helpers/mock/repository.mock';
import { Repository } from 'typeorm';
import { FarmEntity } from '../model/farm.entity';
import { FarmService } from './farm.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockFarm } from '../../helpers/mock/farm.mock';

describe('FarmService', () => {
  let service: FarmService;
  let module: TestingModule;
  let repository: MockType<Repository<FarmEntity>>;
  let mockParams: string;
  let mockHeaders: any;
  let mockBody: any;
  let mockResp: any;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        FarmService,
        {
          provide: getRepositoryToken(FarmEntity),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(FarmEntity),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<FarmService>(FarmService);
    repository = module.get(getRepositoryToken(FarmEntity));
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('Create', () => {
    it('should create a farm', async () => {
      // Mock - Atributos
      mockResp = MockFarm.BODY;
      mockBody = MockFarm.BODY;

      // Mock - Repositório
      repository.save.mockReturnValue(mockResp);

      // Check - Se o resultado do serviço é o esperado
      expect(await service.create(mockBody, mockHeaders)).toEqual(mockResp);
    });

    it('should throw BadRequestException', async () => {
      // Mock - Simulando um erro lançado pelo repositório
      repository.save.mockImplementation(() => {
        throw new Error();
      });

      // check - Se o service lançou um erro de 'Bad Request'
      await service
        .create(mockBody, mockHeaders)
        .then((resp) => {
          expect(resp).toBe(undefined);
        })
        .catch((error) => {
          expect(error.status).toBe(400);
        });
    });
  });

  describe('Find One', () => {
    it('should return a farm', async () => {
      // Mock - Atributos
      mockResp = MockFarm.BODY;

      // Mock - Repositório
      repository.findOne.mockReturnValue(mockResp);

      // Check - Se o resultado do serviço é o esperado
      expect(await service.findOne(mockParams)).toEqual(mockResp);
    });

    it('should throw BadRequestException', async () => {
      // Mock - Simulando um erro lançado pelo repositório
      repository.findOne.mockImplementation(() => {
        throw new Error();
      });

      // check - Se o service lançou um erro de 'Bad Request'
      await service
        .findOne(mockParams)
        .then((resp) => {
          expect(resp).toBe(undefined);
        })
        .catch((error) => {
          expect(error.status).toBe(400);
        });
    });
  });

  describe('Find All', () => {
    it('should return all farms', async () => {
      // Mock - Atributos
      mockResp = MockFarm.SERVICE_TO_FIND_ALL;

      // Mock - Repositório
      repository.find.mockReturnValue(mockResp);

      // Check - Se o resultado do serviço é o esperado
      expect(await service.findAll()).toEqual(mockResp);
    });

    it('should throw BadRequestException', async () => {
      // Mock - Simulando um erro lançado pelo repositório
      repository.find.mockImplementation(() => {
        throw new Error();
      });

      // check - Se o service lançou um erro de 'Bad Request'
      await service
        .findOne(mockParams)
        .then((resp) => {
          expect(resp).toBe(undefined);
        })
        .catch((error) => {
          expect(error.status).toBe(400);
        });
    });
  });

  describe('Update', () => {
    it('should updated a farm', async () => {
      // Mock - Atributos
      mockBody = MockFarm.BODY;
      mockResp = MockFarm.BODY;

      // Mock - Repositório
      repository.findOne.mockReturnValue(MockFarm.SERVICE_TO_FIND_ONE);
      repository.save.mockReturnValue(mockResp);

      // Check - Se o resultado do serviço é o esperado
      expect(await service.update(mockParams, mockBody, mockHeaders)).toBe(
        mockResp,
      );
    });

    it('should throw BadRequestException', async () => {
      // Mock - Simulando um erro lançado pelo repositório
      repository.save.mockImplementation(() => {
        throw new Error();
      });

      // check - Se o service lançou um erro de 'Bad Request'
      await service
        .update(mockParams, mockBody, mockHeaders)
        .then((resp) => {
          expect(resp).toBe(undefined);
        })
        .catch((error) => {
          expect(error.status).toBe(400);
        });
    });
  });

  describe('Delete', () => {
    it('should updated a farm', async () => {
      // Mock - Atributos
      mockBody = MockFarm.BODY;
      mockResp = MockFarm.SERVICE_TO_DELETE;

      // Check - Se o resultado do serviço é o esperado
      const resp = await service.remove(mockParams, mockHeaders);
      expect(resp).toHaveProperty('affected');
    });

    it('should throw BadRequestException', async () => {
      // Mock - Simulando um erro lançado pelo repositório
      repository.createQueryBuilder.mockImplementation(() => {
        throw new Error();
      });

      // check - Se o service lançou um erro de 'Bad Request'
      await service
        .remove(mockParams, mockHeaders)
        .then((resp) => {
          expect(resp).toBe(undefined);
        })
        .catch((error) => {
          expect(error.status).toBe(400);
        });
    });
  });
});
