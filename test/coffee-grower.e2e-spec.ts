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

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let repository: Repository<CoffeeGrowerEntity>;
  let coffeeGrower: any;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        AuthModule,
        CoffeeGrowerModule,
        TypeOrmModule.forRoot(configService.getTypeOrmConfigForTest()),
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    repository = module.get('CoffeeGrowerEntityRepository');
  });

  beforeEach(async () => {
    coffeeGrower = MockConstants.MOCK_COFFEE_GROWER;
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

    it('should throw BadRequestException', async () => {
      // Salvando usuário no banco
      await repository.save({ ...coffeeGrower });

      await supertest
        .agent(app.getHttpServer())
        .post('/coffee-grower')
        .send(coffeeGrower)
        .expect(400); // Deve lançar o bad request pois usuário ja esta no banco
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
      // Salvando as informações no banco para buscar dados
      await supertest
        .agent(app.getHttpServer())
        .post('/coffee-grower')
        .send(coffeeGrower);

      // Realizando o login para pegar o token
      const { body } = await supertest
        .agent(app.getHttpServer())
        .post('/auth/login')
        .send(coffeeGrower);

      await supertest
        .agent(app.getHttpServer())
        .get('/coffee-grower')
        .set('Authorization', 'Bearer ' + body.data.access_token)
        .expect(200); // Deve retornar 200 - OK
    });

    it('should throw NotFoundException', async () => {
      await supertest
        .agent(app.getHttpServer())
        .get('/coffee-grower')
        .set('Authorization', 'Bearer ' + MockConstants.INVALID_TOKEN)
        .expect(404); // Deve retornar 404 - Usuário não encontrado
    });

    it('should throw UnauthorizedException if no auth token', async () => {
      await supertest
        .agent(app.getHttpServer())
        .get('/coffee-grower')
        .expect(401); // Deve retornar 401 - Sem token de autenticação
    });
  });
});
