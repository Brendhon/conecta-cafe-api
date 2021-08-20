import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockConstants, MockFactory } from '../../helpers/mock/common.mock';
import { Repository } from 'typeorm';
import {
  growerRepositoryMockFactory,
  MockType,
} from '../../helpers/mock/repository.mock';
import { CoffeeGrowerEntity } from '../model/coffee-grower.entity';
import { CoffeeGrowerService } from './coffee-grower.service';

describe('CoffeeGrowerService', () => {
  let service: CoffeeGrowerService;
  let module: TestingModule;
  let repository: MockType<Repository<CoffeeGrowerEntity>>;
  let id: string;
  let mockBody: CoffeeGrowerEntity;
  let mockBodyList: CoffeeGrowerEntity[];
  let mockResp: any;
  let mockFactory: any;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        CoffeeGrowerService,
        {
          provide: getRepositoryToken(CoffeeGrowerEntity),
          useFactory: growerRepositoryMockFactory,
        },
      ],
    }).compile();

    // Desabilitando logs
    module.useLogger(false);

    service = module.get<CoffeeGrowerService>(CoffeeGrowerService);
    repository = module.get(getRepositoryToken(CoffeeGrowerEntity));

    // Inicializando fabrica de objetos mocados
    mockFactory = new MockFactory();

    // Mock - Atributos
    mockBody = mockFactory.create(CoffeeGrowerEntity);
    mockBodyList = [];
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('Create', () => {
    it('should create a coffee grower ', async () => {
      // Mock - Atributos
      mockResp = { ...mockBody, password: null };

      // Mock - Repositório
      repository.save.mockReturnValue(mockResp);

      // Check - Se o resultado do serviço é o esperado
      expect(await service.create({ ...mockBody, password: 'quaksm' })).toEqual(
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
        .create(mockBody)
        .then((resp) => {
          expect(resp).toBe(undefined);
        })
        .catch((error) => {
          expect(error.status).toBe(400);
        });
    });
  });

  describe('Find all coffees belonging to a farm', () => {
    it('should return all coffees belonging to a farm ', async () => {
      // Mock - Atributos
      mockResp = mockBody;

      // Mock - Repositório
      repository.findOne.mockReturnValue(mockResp);

      // Check - Se o resultado do serviço é o esperado
      expect(await service.findOne(id)).toEqual(mockResp);
    });

    it('should throw BadRequestException', async () => {
      // Mock - Simulando um erro lançado pelo repositório
      repository.findOne.mockImplementation(() => {
        throw new Error();
      });

      // check - Se o service lançou um erro de 'Bad Request'
      await service
        .findOne(id)
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
      mockResp = mockBodyList;

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
        .findOne(id)
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
      mockResp = MockConstants.MOCK_UPDATE_SERVICE;

      // Mock - Repositório
      repository.update.mockReturnValue(mockResp);

      // Check - Se o resultado do serviço é o esperado
      expect(await service.update(id, mockBody)).toHaveProperty('affected');
    });

    it('should throw BadRequestException', async () => {
      // Mock - Simulando um erro lançado pelo repositório
      repository.update.mockImplementation(() => {
        throw new Error();
      });

      // check - Se o service lançou um erro de 'Bad Request'
      await service
        .update(id, mockBody)
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
      mockResp = MockConstants.MOCK_DELETE_SERVICE;

      // Mock - Repositório
      repository.delete.mockReturnValue(mockResp);

      // Check - Se o resultado do serviço é o esperado
      expect(await service.remove(id)).toHaveProperty('affected');
    });

    it('should throw BadRequestException', async () => {
      // Mock - Simulando um erro lançado pelo repositório
      repository.delete.mockImplementation(() => {
        throw new Error();
      });

      // check - Se o service lançou um erro de 'Bad Request'
      await service
        .remove(id)
        .then((resp) => {
          expect(resp).toBe(undefined);
        })
        .catch((error) => {
          expect(error.status).toBe(400);
        });
    });
  });
});
