import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  coffeeRepositoryMockFactory,
  farmRepositoryMockFactory,
  MockType,
} from '../../helpers/mock/repository.mock';
import { Repository } from 'typeorm';
import { CoffeeEntity } from '../model/coffee.entity';
import { CoffeeService } from './coffee.service';
import { MockConstants, MockFactory } from '../../helpers/mock/common.mock';
import { FarmService } from '../../farm/service/farm.service';
import { FarmEntity } from '../../farm/model/farm.entity';
import { FarmDTO } from '../../farm/dto/farm.dto';
import { ParamsDTO } from '../../helpers/common/dto/params.dto';

describe('CoffeeService', () => {
  let service: CoffeeService;
  let module: TestingModule;
  let repository: MockType<Repository<CoffeeEntity>>;
  let repositoryFarm: MockType<Repository<FarmEntity>>;
  let mockParams: ParamsDTO;
  let mockHeaders: string;
  let mockBody: CoffeeEntity;
  let mockBodyList: CoffeeEntity[];
  let mockFarm: FarmDTO;
  let mockResp: any;
  let mockFactory: any;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        CoffeeService,
        {
          provide: getRepositoryToken(CoffeeEntity),
          useFactory: coffeeRepositoryMockFactory,
        },
        FarmService,
        {
          provide: getRepositoryToken(FarmEntity),
          useFactory: farmRepositoryMockFactory,
        },
      ],
    }).compile();

    // Desabilitando logs
    module.useLogger(false);

    // Mock - Serviço e repositórios
    service = module.get<CoffeeService>(CoffeeService);
    repository = module.get(getRepositoryToken(CoffeeEntity));
    repositoryFarm = module.get(getRepositoryToken(FarmEntity));

    // Inicializando fabrica de objetos mocados
    mockFactory = new MockFactory();

    // Mock - Atributos
    mockHeaders = '';
    mockParams = mockFactory.create(ParamsDTO);
    mockFarm = mockFactory.create(FarmEntity);
    mockFarm.coffeeGrowerId = mockHeaders;
    mockBody = mockFactory.create(CoffeeEntity);
    mockBodyList = [];
  });

  describe('Create', () => {
    it('should create a coffee', async () => {
      // Mock - Atributos
      mockResp = mockBody;

      // Mock - Repositório
      repositoryFarm.findOne.mockReturnValue(mockFarm);
      repository.save.mockReturnValue(mockResp);

      // Check - Se o resultado do serviço é o esperado
      expect(await service.create(mockBody, mockParams, mockHeaders)).toEqual(
        mockResp,
      );
    });

    it('should throw BadRequestException', async () => {
      // Mock - Simulando um erro lançado pelo repositório
      repositoryFarm.findOne.mockReturnValue(mockFarm);
      repository.save.mockImplementation(() => {
        throw new Error();
      });

      // check - Se o service lançou um erro de 'Bad Request'
      await service
        .create(mockBody, mockParams, mockHeaders)
        .then((resp) => {
          expect(resp).toBe(undefined);
        })
        .catch((error) => {
          expect(error.status).toBe(400);
        });
    });
  });

  describe('Find all coffees belonging to a farm', () => {
    it('should return a coffee', async () => {
      // Mock - Atributos
      mockResp = mockBody;

      // Mock - Repositório
      repository.find.mockReturnValue(mockResp);

      // Check - Se o resultado do serviço é o esperado
      expect(await service.find(mockParams)).toEqual(mockResp);
    });

    it('should throw BadRequestException', async () => {
      // Mock - Simulando um erro lançado pelo repositório
      repository.find.mockImplementation(() => {
        throw new Error();
      });

      // check - Se o service lançou um erro de 'Bad Request'
      await service
        .find(mockParams)
        .then((resp) => {
          expect(resp).toBe(undefined);
        })
        .catch((error) => {
          expect(error.status).toBe(400);
        });
    });
  });

  describe('Find All', () => {
    it('should return all coffees', async () => {
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
        .find(mockParams)
        .then((resp) => {
          expect(resp).toBe(undefined);
        })
        .catch((error) => {
          expect(error.status).toBe(400);
        });
    });
  });

  describe('Update', () => {
    it('should updated coffee', async () => {
      // Mock - Atributos
      mockResp = mockBody;

      // Mock - Repositório
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
    it('should updated a coffee', async () => {
      // Mock - Atributos
      mockResp = MockConstants.MOCK_DELETE_SERVICE;

      // Mock - Repositório
      repository.remove.mockReturnValue(MockConstants.MOCK_DELETE_SERVICE);

      // Check - Se o resultado do serviço é o esperado
      const resp = await service.remove(mockParams, mockHeaders);
      expect(resp).toHaveProperty('affected');
    });

    it('should throw BadRequestException', async () => {
      // Mock - Simulando um erro lançado pelo repositório
      repository.remove.mockImplementation(() => {
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
