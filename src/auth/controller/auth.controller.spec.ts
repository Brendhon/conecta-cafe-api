import { Test, TestingModule } from '@nestjs/testing';
import { MockFactory } from '../../helpers/mock/common.mock';
import { LoginDTO } from '../dto/login.dto';
import { AuthService } from '../service/auth.service';
import { AuthController } from './auth.controller';

// Realizando o mock do serviço
jest.mock('../service/auth.service');

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;
  let mockFactory;
  let mockBody: LoginDTO;
  let mockResp: { access_token: '' };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);

    // Inicializando fabrica de objetos mocados
    mockFactory = new MockFactory();

    // Mock - Atributos
    mockBody = mockFactory.create(LoginDTO);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Can login', async () => {
    // Mock - function
    jest.spyOn(service, 'login').mockResolvedValue(mockResp);

    // Check - se sucesso é verdadeiro
    expect(await controller.login(mockBody)).toMatchObject({
      success: true,
      data: mockResp,
      error: {},
    });
  });
});
