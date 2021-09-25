/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as supertest from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from '../src/helpers/config/config.service';
import { CoffeeGrowerModule } from '../src/coffee-grower/coffee-grower.module';
import { Repository } from 'typeorm';
import { CoffeeGrowerEntity } from '../src/coffee-grower/model/coffee-grower.entity';
import { MockConstants } from '../src/helpers/mock/common.mock';
import { AuthModule } from '../src/auth/auth.module';
import { AuthService } from '../src/auth/service/auth.service';
import * as bcrypt from 'bcrypt';

describe('Coffee Grower (e2e)', () => {
  let app: INestApplication;
  let repository: Repository<CoffeeGrowerEntity>;
  let coffeeGrower: any;
  let authService: AuthService;
  let fake_token: any;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        AuthModule,
        CoffeeGrowerModule,
        TypeOrmModule.forRoot(configService.getTypeOrmConfigForTest()),
      ],
    }).compile();

    module.useLogger(false);
    app = module.createNestApplication();
    await app.init();
    repository = module.get('CoffeeGrowerEntityRepository');
    authService = await module.get<AuthService>(AuthService);

    // Removendo todos os atributos que podem existir dentro da tabelas
    await repository.query(`DELETE FROM coffee_grower;`);

    // Pegando o token de acesso falso
    await authService
      .login(MockConstants.MOCK_SECOND_COFFEE_GROWER as CoffeeGrowerEntity)
      .then((resp) => (fake_token = resp.access_token));
  });

  beforeEach(async () => {
    coffeeGrower = { ...MockConstants.MOCK_COFFEE_GROWER };
  });

  afterEach(async () => {
    await repository.query(`DELETE FROM coffee_grower;`);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /coffee-grower', () => {
    it('should create a coffee grower', async () => {
      await supertest
        .agent(app.getHttpServer())
        .post('/coffee-grower')
        .send(coffeeGrower)
        .expect(201); // Deve retornar 201 - created
    });

    it('should throw BadRequestException if request body does not have email', async () => {
      const { email, ...rest } = coffeeGrower;
      await supertest
        .agent(app.getHttpServer())
        .post('/coffee-grower')
        .send(rest)
        .expect(400);
    });

    it('should throw BadRequestException if request body does not have password', async () => {
      const { password, ...rest } = coffeeGrower;
      await supertest
        .agent(app.getHttpServer())
        .post('/coffee-grower')
        .send(rest)
        .expect(400);
    });

    it('should throw BadRequestException if request body does not have name', async () => {
      const { name, ...rest } = coffeeGrower;
      await supertest
        .agent(app.getHttpServer())
        .post('/coffee-grower')
        .send(rest)
        .expect(400);
    });

    it('should throw ConflictException if Coffee Grower already exist', async () => {
      // Salvando usuário no banco
      await repository.save({ ...coffeeGrower });
      await supertest
        .agent(app.getHttpServer())
        .post('/coffee-grower')
        .send(coffeeGrower)
        .expect(409); // Deve lançar o Conflict pois usuário ja esta no banco
    });
  });

  describe('GET /coffee-grower', () => {
    it('should list all coffee growers', async () => {
      await supertest
        .agent(app.getHttpServer())
        .get('/coffee-grower/all')
        .expect(200); // Deve retornar 200 - OK
    });

    it('should list a coffee grower', async () => {
      const hash = await bcrypt.hash(coffeeGrower.password, 10); // Não salvar a senha em formato texto
      const resp = await repository.save({ ...coffeeGrower, password: hash }); // Salvando coffee grower para teste
      const { access_token } = await authService.login(resp); // Realizando Login para pegar o token de acesso

      await supertest
        .agent(app.getHttpServer())
        .get('/coffee-grower')
        .set('Authorization', 'Bearer ' + access_token)
        .expect(200); // Deve retornar 200 - OK
    });

    it('should throw NotFoundException', async () => {
      await supertest
        .agent(app.getHttpServer())
        .get('/coffee-grower')
        .set('Authorization', 'Bearer ' + fake_token)
        .expect(404); // Deve retornar 404 - Usuário não encontrado
    });

    it('should throw UnauthorizedException if no auth token', async () => {
      await supertest
        .agent(app.getHttpServer())
        .get('/coffee-grower')
        .expect(401); // Deve retornar 401 - Sem token de autenticação
    });
  });

  describe('PUT /coffee-grower', () => {
    it('should update a coffee grower', async () => {
      const hash = await bcrypt.hash(coffeeGrower.password, 10); // Não salvar a senha em formato texto
      const resp = await repository.save({ ...coffeeGrower, password: hash }); // Salvando coffee grower para teste
      const { access_token } = await authService.login(resp); // Realizando Login para pegar o token de acesso

      await supertest
        .agent(app.getHttpServer())
        .put('/coffee-grower')
        .set('Authorization', 'Bearer ' + access_token)
        .send({ name: 'Teste' })
        .expect(200); // Deve retornar 200 - OK
    });

    it('should throw ForbiddenException', async () => {
      await supertest
        .agent(app.getHttpServer())
        .put('/coffee-grower')
        .set('Authorization', 'Bearer ' + fake_token)
        .send({ name: 'Teste' })
        .expect(403); // Deve retornar 403 - Ação não permitida
    });

    it('should throw UnauthorizedException if no auth token', async () => {
      await supertest
        .agent(app.getHttpServer())
        .put('/coffee-grower')
        .send({ name: 'Teste' })
        .expect(401); // Deve retornar 401 - Sem token de autenticação
    });
  });

  describe('DELETE /coffee-grower', () => {
    it('should delete a coffee grower', async () => {
      const hash = await bcrypt.hash(coffeeGrower.password, 10); // Não salvar a senha em formato texto
      const resp = await repository.save({ ...coffeeGrower, password: hash }); // Salvando coffee grower para teste
      const { access_token } = await authService.login(resp); // Realizando Login para pegar o token de acesso

      await supertest
        .agent(app.getHttpServer())
        .delete('/coffee-grower')
        .set('Authorization', 'Bearer ' + access_token)
        .expect(200); // Deve retornar 200 - OK
    });

    it('should throw ForbiddenException', async () => {
      await supertest
        .agent(app.getHttpServer())
        .delete('/coffee-grower')
        .set('Authorization', 'Bearer ' + fake_token)
        .expect(403); // Deve retornar 403 - Ação não permitida
    });

    it('should throw UnauthorizedException if no auth token', async () => {
      await supertest
        .agent(app.getHttpServer())
        .delete('/coffee-grower')
        .expect(401); // Deve retornar 401 - Sem token de autenticação
    });
  });
});
