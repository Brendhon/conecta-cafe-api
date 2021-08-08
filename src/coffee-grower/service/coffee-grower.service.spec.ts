import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ConstantsExample } from '../../helpers/common/constants/example-constants';
import {
  MockType,
  repositoryMockFactory,
} from '../../helpers/common/mock/repository.mock';
import { CoffeeGrowerEntity } from '../model/coffee-grower.entity';
import { CoffeeGrowerService } from './coffee-grower.service';

describe('CoffeeGrowerService', () => {
  let service: CoffeeGrowerService;
  let module: TestingModule;
  let repository: MockType<Repository<CoffeeGrowerEntity>>;
  let mockParams: string;
  let mockBody: any;
  let mockResp: any;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        CoffeeGrowerService,
        {
          provide: getRepositoryToken(CoffeeGrowerEntity),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(CoffeeGrowerEntity),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();
    service = module.get<CoffeeGrowerService>(CoffeeGrowerService);
    repository = module.get(getRepositoryToken(CoffeeGrowerEntity));
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('Create', () => {
    it('should create a coffee grower ', async () => {
      // Mock - Atributos
      mockResp = ConstantsExample.MOCK_BODY_COFFEE_GROWER;
      mockBody = ConstantsExample.MOCK_BODY_COFFEE_GROWER;

      // Mock - Repositório
      repository.save.mockReturnValue(mockResp);

      // Check - Se o resultado do serviço é o esperado
      expect(await service.create(mockBody)).toEqual(mockResp);
    });

    it('should throw BadRequestException', async () => {
      // Mock - Simulando um erro lançado pelo repositório
      repository.save.mockImplementation(() => {
        throw new Error();
      });

      // check - Se o service lançou um erro de 'Bad Request'
      await service
        .create(mockBody)
        .then((resp) => {
          expect(resp).toBe(undefined);
        })
        .catch((error) => {
          expect(error.status).toBe(400);
        });
    });
  });

  describe('Find One', () => {
    it('should return a coffee grower ', async () => {
      // Mock - Atributos
      mockResp = ConstantsExample.MOCK_BODY_COFFEE_GROWER;

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
    it('should return all coffee grower ', async () => {
      // Mock - Atributos
      mockResp = ConstantsExample.MOCK_SERVICE_TO_FIND_ALL_GROWERS;

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
    it('should updated a coffee grower ', async () => {
      // Mock - Atributos
      mockBody = ConstantsExample.MOCK_BODY_COFFEE_GROWER;
      mockResp = ConstantsExample.MOCK_SERVICE_TO_UPDATE_GROWERS;

      // Mock - Repositório
      repository.update.mockReturnValue(mockResp);

      // Check - Se o resultado do serviço é o esperado
      expect(await service.update(mockParams, mockBody)).toHaveProperty(
        'affected',
      );
    });

    it('should throw BadRequestException', async () => {
      // Mock - Simulando um erro lançado pelo repositório
      repository.update.mockImplementation(() => {
        throw new Error();
      });

      // check - Se o service lançou um erro de 'Bad Request'
      await service
        .update(mockParams, mockBody)
        .then((resp) => {
          expect(resp).toBe(undefined);
        })
        .catch((error) => {
          expect(error.status).toBe(400);
        });
    });
  });

  describe('Delete', () => {
    it('should updated a coffee grower ', async () => {
      // Mock - Atributos
      mockBody = ConstantsExample.MOCK_BODY_COFFEE_GROWER;
      mockResp = ConstantsExample.MOCK_SERVICE_TO_DELETE_GROWERS;

      // Mock - Repositório
      repository.delete.mockReturnValue(mockResp);

      // Check - Se o resultado do serviço é o esperado
      expect(await service.remove(mockParams)).toHaveProperty('affected');
    });

    it('should throw BadRequestException', async () => {
      // Mock - Simulando um erro lançado pelo repositório
      repository.delete.mockImplementation(() => {
        throw new Error();
      });

      // check - Se o service lançou um erro de 'Bad Request'
      await service
        .remove(mockParams)
        .then((resp) => {
          expect(resp).toBe(undefined);
        })
        .catch((error) => {
          expect(error.status).toBe(400);
        });
    });
  });
});
