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
import { FarmModule } from '../src/farm/farm.module';
import { FarmEntity } from '../src/farm/model/farm.entity';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../src/auth/service/auth.service';
import { CoffeeEntity } from '../src/coffee/model/coffee.entity';
import { CoffeeModule } from '../src/coffee/coffee.module';

describe('Coffee (e2e)', () => {
  let app: INestApplication;
  let repositoryCoffeeGrower: Repository<CoffeeGrowerEntity>;
  let repositoryFarm: Repository<FarmEntity>;
  let repositoryCoffee: Repository<CoffeeEntity>;
  let coffeeGrower: any;
  let coffeeGrowerId: any;
  let coffee: any;
  let special: any;
  let farm: any;
  let farmId: any;
  let authService: AuthService;
  let access_token: any;
  let fake_token: any;
  let invalidId: any;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        AuthModule,
        CoffeeGrowerModule,
        FarmModule,
        CoffeeModule,
        TypeOrmModule.forRoot(configService.getTypeOrmConfigForTest()),
      ],
    }).compile();

    module.useLogger(false);
    app = module.createNestApplication();
    await app.init();

    // Pegando os repositorios e serviços necessarios para os testes
    repositoryCoffeeGrower = module.get('CoffeeGrowerEntityRepository');
    repositoryFarm = module.get('FarmEntityRepository');
    repositoryCoffee = module.get('CoffeeEntityRepository');
    authService = await module.get<AuthService>(AuthService);

    // Removendo todos os atributos que podem existir dentro da tabelas
    await repositoryFarm.query(`DELETE FROM coffee;`);
    await repositoryFarm.query(`DELETE FROM farm;`);
    await repositoryCoffeeGrower.query(`DELETE FROM coffee_grower;`);
  });

  beforeEach(async () => {
    // Criando um cafeicultor para testes
    coffeeGrower = MockConstants.MOCK_COFFEE_GROWER; // Definindo os dados do cafeicultor
    const hash = await bcrypt.hash(coffeeGrower.password, 10); // Não salvar a senha em formato texto
    await repositoryCoffeeGrower
      .save({ ...coffeeGrower, password: hash }) // Salvando coffee grower para teste
      .then(async (resp) => {
        await authService
          .login(resp) // Realizando o login com os dados resultante do salvamento do cafeicultor
          .then((value) => {
            coffeeGrowerId = resp.id; // Pegando o id do cafeicultor responsavel
            access_token = value.access_token; // Pegando o token de acesso resultante desse login
          });
      });

    // Definindo os dados de uma fazenda para testes
    farm = { ...MockConstants.MOCK_FARM };
    invalidId = MockConstants.INVALID_ID;
    await repositoryFarm
      .save({ ...farm, coffeeGrowerId }) // Salvando coffee grower para teste
      .then(async (resp) => {
        farmId = resp.id; // Salvando o id do cafeicultor para testes
      });

    // Definindo os dados de um cafe para testes
    coffee = { ...MockConstants.MOCK_COFFEE };
    special = { ...MockConstants.MOCK_SPECIAL_COFFEE };
    coffee.special = special;

    // Criando um token de acesso falso
    await authService
      .login(MockConstants.MOCK_SECOND_COFFEE_GROWER as CoffeeGrowerEntity)
      .then((resp) => (fake_token = resp.access_token));
  });

  afterEach(async () => {
    await repositoryFarm.query(`DELETE FROM coffee;`);
    await repositoryFarm.query(`DELETE FROM farm;`);
    await repositoryCoffeeGrower.query(`DELETE FROM coffee_grower;`);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /coffee', () => {
    it('should create a coffee', async () => {
      await supertest
        .agent(app.getHttpServer())
        .post(`/coffee/${farmId}`)
        .set('Authorization', 'Bearer ' + access_token)
        .send(coffee)
        .expect(201); // Deve retornar 201 - created
    });

    it('should throw ForbiddenException if farm id is invalid', async () => {
      await supertest
        .agent(app.getHttpServer())
        .post(`/coffee/${invalidId}`)
        .set('Authorization', 'Bearer ' + access_token)
        .send(coffee)
        .expect(403); // Deve retornar 403 - forbidden
    });

    it('should throw ForbiddenException if token not belong to responsible coffee grower', async () => {
      await supertest
        .agent(app.getHttpServer())
        .post(`/coffee/${farmId}`)
        .set('Authorization', 'Bearer ' + fake_token)
        .send(coffee)
        .expect(403); // Deve retornar 403 - forbidden
    });

    it('should throw UnauthorizedException if no auth token', async () => {
      await supertest
        .agent(app.getHttpServer())
        .post(`/coffee/${farmId}`)
        .send(coffee)
        .expect(401); // Deve retornar 401 - unauthorized
    });

    it('should throw BadRequestException if variety not exist', async () => {
      delete coffee['variety'];
      await supertest
        .agent(app.getHttpServer())
        .post(`/coffee/${farmId}`)
        .set('Authorization', 'Bearer ' + access_token)
        .send({
          ...coffee,
        })
        .expect(400); // Deve retornar 400 - bad request
    });

    it('should throw BadRequestException if species not exist', async () => {
      delete coffee['species'];
      await supertest
        .agent(app.getHttpServer())
        .post(`/coffee/${farmId}`)
        .set('Authorization', 'Bearer ' + access_token)
        .send({
          ...coffee,
        })
        .expect(400); // Deve retornar 400 - bad request
    });

    it('should throw BadRequestException if altitude not exist', async () => {
      delete coffee['altitude'];
      await supertest
        .agent(app.getHttpServer())
        .post(`/coffee/${farmId}`)
        .set('Authorization', 'Bearer ' + access_token)
        .send({
          ...coffee,
        })
        .expect(400); // Deve retornar 400 - bad request
    });

    it('should throw BadRequestException if process not exist', async () => {
      delete coffee['process'];
      await supertest
        .agent(app.getHttpServer())
        .post(`/coffee/${farmId}`)
        .set('Authorization', 'Bearer ' + access_token)
        .send({
          ...coffee,
        })
        .expect(400); // Deve retornar 400 - bad request
    });

    it('should throw BadRequestException if harvest not exist', async () => {
      delete coffee['harvest'];
      await supertest
        .agent(app.getHttpServer())
        .post(`/coffee/${farmId}`)
        .set('Authorization', 'Bearer ' + access_token)
        .send({
          ...coffee,
        })
        .expect(400); // Deve retornar 400 - bad request
    });

    it('should throw BadRequestException if harvestValue not exist', async () => {
      delete coffee['harvestValue'];
      await supertest
        .agent(app.getHttpServer())
        .post(`/coffee/${farmId}`)
        .set('Authorization', 'Bearer ' + access_token)
        .send({
          ...coffee,
        })
        .expect(400); // Deve retornar 400 - bad request
    });

    it('should create coffee if special not exist', async () => {
      delete coffee['special'];
      await supertest
        .agent(app.getHttpServer())
        .post(`/coffee/${farmId}`)
        .set('Authorization', 'Bearer ' + access_token)
        .send({
          ...coffee,
        })
        .expect(201); // Deve retornar 201 - created
    });

    it('should create coffee if special.aroma not exist', async () => {
      delete special['aroma'];
      await supertest
        .agent(app.getHttpServer())
        .post(`/coffee/${farmId}`)
        .set('Authorization', 'Bearer ' + access_token)
        .send({
          ...coffee,
          special,
        })
        .expect(201); // Deve retornar 201 - created
    });

    it('should create coffee if special.flavor not exist', async () => {
      delete special['flavor'];
      await supertest
        .agent(app.getHttpServer())
        .post(`/coffee/${farmId}`)
        .set('Authorization', 'Bearer ' + access_token)
        .send({
          ...coffee,
          special,
        })
        .expect(201); // Deve retornar 201 - created
    });

    it('should create coffee if special.completion not exist', async () => {
      delete special['completion'];
      await supertest
        .agent(app.getHttpServer())
        .post(`/coffee/${farmId}`)
        .set('Authorization', 'Bearer ' + access_token)
        .send({
          ...coffee,
          special,
        })
        .expect(201); // Deve retornar 201 - created
    });

    it('should create coffee if special.acidity not exist', async () => {
      delete special['acidity'];
      await supertest
        .agent(app.getHttpServer())
        .post(`/coffee/${farmId}`)
        .set('Authorization', 'Bearer ' + access_token)
        .send({
          ...coffee,
          special,
        })
        .expect(201); // Deve retornar 201 - created
    });

    it('should create coffee if special.body not exist', async () => {
      delete special['body'];
      await supertest
        .agent(app.getHttpServer())
        .post(`/coffee/${farmId}`)
        .set('Authorization', 'Bearer ' + access_token)
        .send({
          ...coffee,
          special,
        })
        .expect(201); // Deve retornar 201 - created
    });

    it('should create coffee if special.sweetness not exist', async () => {
      delete special['sweetness'];
      await supertest
        .agent(app.getHttpServer())
        .post(`/coffee/${farmId}`)
        .set('Authorization', 'Bearer ' + access_token)
        .send({
          ...coffee,
          special,
        })
        .expect(201); // Deve retornar 201 - created
    });
  });

  describe('GET /coffee', () => {
    it('should list all coffees', async () => {
      await supertest.agent(app.getHttpServer()).get('/coffee/all').expect(200); // Deve retornar 200 - OK
    });

    it('should list a coffee', async () => {
      await supertest
        .agent(app.getHttpServer())
        .get(`/coffee/${farmId}`)
        .expect(200); // Deve retornar 200 - OK
    });
  });

  describe('PUT /coffee', () => {
    it('should update a coffee', async () => {
      const resp = await repositoryCoffee.save({ ...coffee, farmId }); // Salvando fazenda para teste
      await supertest
        .agent(app.getHttpServer())
        .put(`/coffee/${resp.id}`)
        .set('Authorization', 'Bearer ' + access_token)
        .send({ variety: 'Teste' })
        .expect(200); // Deve retornar 200 - OK
    });

    it('should throw ForbiddenException if coffee id is invalid', async () => {
      await supertest
        .agent(app.getHttpServer())
        .put(`/coffee/${invalidId}`)
        .set('Authorization', 'Bearer ' + access_token)
        .send({ variety: 'Teste' })
        .expect(403); // Deve retornar 403 - Ação não permitida
    });

    it('should throw ForbiddenException if token not belong to responsible coffee grower', async () => {
      const resp = await repositoryCoffee.save({ ...coffee, farmId }); // Salvando coffee para teste
      await supertest
        .agent(app.getHttpServer())
        .put(`/coffee/${resp.id}`)
        .set('Authorization', 'Bearer ' + fake_token)
        .send({ variety: 'Teste' })
        .expect(403); // Deve retornar 403 - Ação não permitida
    });

    it('should throw UnauthorizedException if no auth token', async () => {
      const resp = await repositoryCoffee.save({ ...coffee, farmId }); // Salvando coffee para teste
      await supertest
        .agent(app.getHttpServer())
        .put(`/coffee/${resp.id}`)
        .send({ variety: 'Teste' })
        .expect(401); // Deve retornar 401 - Sem token de autenticação
    });
  });

  describe('DELETE /coffee', () => {
    it('should delete a coffee', async () => {
      const resp = await repositoryCoffee.save({ ...coffee, farmId }); // Salvando coffee para teste
      await supertest
        .agent(app.getHttpServer())
        .delete(`/coffee/${resp.id}`)
        .set('Authorization', 'Bearer ' + access_token)
        .expect(200); // Deve retornar 200 - OK
    });

    it('should throw ForbiddenException if coffee id is invalid', async () => {
      await supertest
        .agent(app.getHttpServer())
        .delete(`/coffee/${invalidId}`)
        .set('Authorization', 'Bearer ' + access_token)
        .expect(403); // Deve retornar 403 - Ação não permitida
    });

    it('should throw ForbiddenException if token not belong to responsible coffee grower', async () => {
      const resp = await repositoryCoffee.save({ ...coffee, farmId }); // Salvando coffee para teste
      await supertest
        .agent(app.getHttpServer())
        .delete(`/coffee/${resp.id}`)
        .set('Authorization', 'Bearer ' + fake_token)
        .expect(403); // Deve retornar 403 - Ação não permitida
    });

    it('should throw UnauthorizedException if no auth token', async () => {
      const resp = await repositoryCoffee.save({ ...coffee, farmId }); // Salvando coffee para teste
      await supertest
        .agent(app.getHttpServer())
        .delete(`/coffee/${resp.id}`)
        .expect(401); // Deve retornar 401 - Sem token de autenticação
    });
  });
});
