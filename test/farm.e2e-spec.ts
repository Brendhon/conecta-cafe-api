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
import { FarmModule } from '../src/farm/farm.module';
import { FarmEntity } from '../src/farm/model/farm.entity';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../src/auth/service/auth.service';

describe('Farm (e2e)', () => {
  let app: INestApplication;
  let repositoryCoffeeGrower: Repository<CoffeeGrowerEntity>;
  let repositoryFarm: Repository<FarmEntity>;
  let coffeeGrower: any;
  let coffeeGrowerId: any;
  let farm: any;
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
        TypeOrmModule.forRoot(configService.getTypeOrmConfigForTest()),
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    // Pegando os repositorios e serviços necessarios para os testes
    repositoryCoffeeGrower = module.get('CoffeeGrowerEntityRepository');
    repositoryFarm = module.get('FarmEntityRepository');
    authService = await module.get<AuthService>(AuthService);
  });

  beforeEach(async () => {
    // Definindo os dados de uma fazenda
    farm = { ...MockConstants.MOCK_FARM };

    invalidId = MockConstants.INVALID_ID;

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

    // Criando um token de acesso falso
    await authService
      .login(MockConstants.MOCK_SECOND_COFFEE_GROWER as CoffeeGrowerEntity)
      .then((resp) => (fake_token = resp.access_token));
  });

  afterEach(async () => {
    await repositoryFarm.query(`DELETE FROM farm;`);
    await repositoryCoffeeGrower.query(`DELETE FROM coffee_grower;`);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /farm', () => {
    it('should create a farm', async () => {
      await supertest
        .agent(app.getHttpServer())
        .post('/farm')
        .set('Authorization', 'Bearer ' + access_token)
        .send(farm)
        .expect(201); // Deve retornar 201 - created
    });

    it('should throw BadRequestException if coffee grower not exist', async () => {
      await supertest
        .agent(app.getHttpServer())
        .post('/farm')
        .set('Authorization', 'Bearer ' + fake_token)
        .send(farm)
        .expect(400); // Deve retornar 400 - Bad Request
    });

    it('should throw BadRequestException if name is not a string', async () => {
      await supertest
        .agent(app.getHttpServer())
        .post('/farm')
        .set('Authorization', 'Bearer ' + access_token)
        .send({ ...farm, farm_name: null })
        .expect(400); // Deve retornar 400 - Bad Request
    });

    it('should throw BadRequestException if street not exist', async () => {
      await supertest
        .agent(app.getHttpServer())
        .post('/farm')
        .set('Authorization', 'Bearer ' + access_token)
        .send({
          ...farm,
          address: {
            city: 'Ouro Fino',
            country: 'Brasil',
            uf: 'MG',
          },
        })
        .expect(400); // Deve retornar 400 - Bad Request
    });

    it('should throw BadRequestException if city not exist', async () => {
      await supertest
        .agent(app.getHttpServer())
        .post('/farm')
        .set('Authorization', 'Bearer ' + access_token)
        .send({
          ...farm,
          address: {
            street: 'Rua dos Pinheiros, Taguá',
            country: 'Brasil',
            uf: 'MG',
          },
        })
        .expect(400); // Deve retornar 400 - Bad Request
    });

    it('should throw BadRequestException if country not exist', async () => {
      await supertest
        .agent(app.getHttpServer())
        .post('/farm')
        .set('Authorization', 'Bearer ' + access_token)
        .send({
          ...farm,
          address: {
            street: 'Rua dos Pinheiros, Taguá',
            city: 'Ouro Fino',
            uf: 'MG',
          },
        })
        .expect(400); // Deve retornar 400 - Bad Request
    });

    it('should throw BadRequestException if UF not exist', async () => {
      await supertest
        .agent(app.getHttpServer())
        .post('/farm')
        .set('Authorization', 'Bearer ' + access_token)
        .send({
          ...farm,
          address: {
            street: 'Rua dos Pinheiros, Taguá',
            city: 'Ouro Fino',
            country: 'Brasil',
          },
        })
        .expect(400); // Deve retornar 400 - Bad Request
    });

    it('should throw BadRequestException if phone not exist', async () => {
      await supertest
        .agent(app.getHttpServer())
        .post('/farm')
        .set('Authorization', 'Bearer ' + access_token)
        .send({
          ...farm,
          contact: {
            contact_email: 'farm@farm.com.br',
            facebook: 'string',
            linkedIn: 'string',
            whatsApp: 'string',
            youTube: 'string',
            instagram: 'string',
            twitter: 'string',
          },
        })
        .expect(400); // Deve retornar 400 - Bad Request
    });

    it('should create a farm without contact_email', async () => {
      await supertest
        .agent(app.getHttpServer())
        .post('/farm')
        .set('Authorization', 'Bearer ' + access_token)
        .send({
          ...farm,
          contact: {
            phone: '+553534453539',
            facebook: 'string',
            linkedIn: 'string',
            whatsApp: 'string',
            youTube: 'string',
            instagram: 'string',
            twitter: 'string',
          },
        })
        .expect(201); // Deve retornar 201 - created
    });

    it('should create a farm without facebook', async () => {
      await supertest
        .agent(app.getHttpServer())
        .post('/farm')
        .set('Authorization', 'Bearer ' + access_token)
        .send({
          ...farm,
          contact: {
            phone: '+553534453539',
            contact_email: 'farm@farm.com.br',
            linkedIn: 'string',
            whatsApp: 'string',
            youTube: 'string',
            instagram: 'string',
            twitter: 'string',
          },
        })
        .expect(201); // Deve retornar 201 - created
    });
    it('should create a farm without linkedIn', async () => {
      await supertest
        .agent(app.getHttpServer())
        .post('/farm')
        .set('Authorization', 'Bearer ' + access_token)
        .send({
          ...farm,
          contact: {
            phone: '+553534453539',
            contact_email: 'farm@farm.com.br',
            facebook: 'string',
            whatsApp: 'string',
            youTube: 'string',
            instagram: 'string',
            twitter: 'string',
          },
        })
        .expect(201); // Deve retornar 201 - created
    });

    it('should create a farm without whatsApp', async () => {
      await supertest
        .agent(app.getHttpServer())
        .post('/farm')
        .set('Authorization', 'Bearer ' + access_token)
        .send({
          ...farm,
          contact: {
            phone: '+553534453539',
            contact_email: 'farm@farm.com.br',
            facebook: 'string',
            linkedIn: 'string',
            youTube: 'string',
            instagram: 'string',
            twitter: 'string',
          },
        })
        .expect(201); // Deve retornar 201 - created
    });

    it('should create a farm without youTube', async () => {
      await supertest
        .agent(app.getHttpServer())
        .post('/farm')
        .set('Authorization', 'Bearer ' + access_token)
        .send({
          ...farm,
          contact: {
            phone: '+553534453539',
            contact_email: 'farm@farm.com.br',
            facebook: 'string',
            linkedIn: 'string',
            whatsApp: 'string',
            instagram: 'string',
            twitter: 'string',
          },
        })
        .expect(201); // Deve retornar 201 - created
    });

    it('should create a farm without instagram', async () => {
      await supertest
        .agent(app.getHttpServer())
        .post('/farm')
        .set('Authorization', 'Bearer ' + access_token)
        .send({
          ...farm,
          contact: {
            phone: '+553534453539',
            contact_email: 'farm@farm.com.br',
            facebook: 'string',
            linkedIn: 'string',
            whatsApp: 'string',
            youTube: 'string',
            twitter: 'string',
          },
        })
        .expect(201); // Deve retornar 201 - created
    });

    it('should create a farm without twitter', async () => {
      await supertest
        .agent(app.getHttpServer())
        .post('/farm')
        .set('Authorization', 'Bearer ' + access_token)
        .send({
          ...farm,
          contact: {
            phone: '+553534453539',
            contact_email: 'farm@farm.com.br',
            facebook: 'string',
            linkedIn: 'string',
            whatsApp: 'string',
            youTube: 'string',
            instagram: 'string',
          },
        })
        .expect(201); // Deve retornar 201 - created
    });

    it('should create a farm without medias', async () => {
      delete farm['medias'];
      await supertest
        .agent(app.getHttpServer())
        .post('/farm')
        .set('Authorization', 'Bearer ' + access_token)
        .send(farm)
        .expect(201); // Deve retornar 201 - created
    });

    it('should throw BadRequestException if history is not defined', async () => {
      await supertest
        .agent(app.getHttpServer())
        .post('/farm')
        .set('Authorization', 'Bearer ' + access_token)
        .send({
          ...farm,
          history: null,
        })
        .expect(400); // Deve retornar 400 - Bad Request
    });

    it('should throw BadRequestException if insecticides not exist', async () => {
      delete farm['insecticides'];
      await supertest
        .agent(app.getHttpServer())
        .post('/farm')
        .set('Authorization', 'Bearer ' + access_token)
        .send(farm)
        .expect(400); // Deve retornar 400 - Bad Request
    });

    it('should throw BadRequestException if fertilizers not exist', async () => {
      delete farm['fertilizers'];
      await supertest
        .agent(app.getHttpServer())
        .post('/farm')
        .set('Authorization', 'Bearer ' + access_token)
        .send(farm)
        .expect(400); // Deve retornar 400 - Bad Request
    });
  });

  describe('GET /farm', () => {
    it('should list all farms', async () => {
      await supertest.agent(app.getHttpServer()).get('/farm/all').expect(200); // Deve retornar 200 - OK
    });

    it('should list a farm', async () => {
      const resp = await repositoryFarm.save({ ...farm, coffeeGrowerId }); // Salvando fazenda para teste
      await supertest
        .agent(app.getHttpServer())
        .get(`/farm/${resp.id}`)
        .expect(200); // Deve retornar 200 - OK
    });

    it('should throw NotFoundException', async () => {
      await supertest
        .agent(app.getHttpServer())
        .get(`/farm/${invalidId}`)
        .expect(404); // Deve retornar 404 - Usuário não encontrado
    });
  });

  describe('PUT /farm', () => {
    it('should update a farm', async () => {
      const resp = await repositoryFarm.save({ ...farm, coffeeGrowerId }); // Salvando fazenda para teste
      await supertest
        .agent(app.getHttpServer())
        .put(`/farm/${resp.id}`)
        .set('Authorization', 'Bearer ' + access_token)
        .send({ name: 'Teste' })
        .expect(200); // Deve retornar 200 - OK
    });

    it('should throw ForbiddenException if farm id is invalid', async () => {
      await supertest
        .agent(app.getHttpServer())
        .put(`/farm/${invalidId}`)
        .set('Authorization', 'Bearer ' + access_token)
        .send({ name: 'Teste' })
        .expect(403); // Deve retornar 403 - Ação não permitida
    });

    it('should throw ForbiddenException if token not belong to responsible coffee grower', async () => {
      const resp = await repositoryFarm.save({ ...farm, coffeeGrowerId }); // Salvando fazenda para teste
      await supertest
        .agent(app.getHttpServer())
        .put(`/farm/${resp.id}`)
        .set('Authorization', 'Bearer ' + fake_token)
        .send({ name: 'Teste' })
        .expect(403); // Deve retornar 403 - Ação não permitida
    });

    it('should throw UnauthorizedException if no auth token', async () => {
      const resp = await repositoryFarm.save({ ...farm, coffeeGrowerId }); // Salvando fazenda para teste
      await supertest
        .agent(app.getHttpServer())
        .put(`/farm/${resp.id}`)
        .send({ name: 'Teste' })
        .expect(401); // Deve retornar 401 - Sem token de autenticação
    });
  });

  describe('DELETE /farm', () => {
    it('should delete a farm', async () => {
      const resp = await repositoryFarm.save({ ...farm, coffeeGrowerId }); // Salvando fazenda para teste
      await supertest
        .agent(app.getHttpServer())
        .delete(`/farm/${resp.id}`)
        .set('Authorization', 'Bearer ' + access_token)
        .expect(200); // Deve retornar 200 - OK
    });

    it('should throw ForbiddenException if farm id is invalid', async () => {
      await supertest
        .agent(app.getHttpServer())
        .delete(`/farm/${invalidId}`)
        .set('Authorization', 'Bearer ' + access_token)
        .expect(403); // Deve retornar 403 - Ação não permitida
    });

    it('should throw ForbiddenException if token not belong to responsible coffee grower', async () => {
      const resp = await repositoryFarm.save({ ...farm, coffeeGrowerId }); // Salvando fazenda para teste
      await supertest
        .agent(app.getHttpServer())
        .delete(`/farm/${resp.id}`)
        .set('Authorization', 'Bearer ' + fake_token)
        .expect(403); // Deve retornar 403 - Ação não permitida
    });

    it('should throw UnauthorizedException if no auth token', async () => {
      const resp = await repositoryFarm.save({ ...farm, coffeeGrowerId }); // Salvando fazenda para teste
      await supertest
        .agent(app.getHttpServer())
        .delete(`/farm/${resp.id}`)
        .expect(401); // Deve retornar 401 - Sem token de autenticação
    });
  });
});
