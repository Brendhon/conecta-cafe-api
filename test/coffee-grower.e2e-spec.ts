import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as supertest from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from '../src/helpers/config/config.service';
import { CoffeeGrowerModule } from '../src/coffee-grower/coffee-grower.module';
import { Repository } from 'typeorm';
import { CoffeeGrowerEntity } from '../src/coffee-grower/model/coffee-grower.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let repository: Repository<CoffeeGrowerEntity>;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        CoffeeGrowerModule,
        TypeOrmModule.forRoot(configService.getTypeOrmConfigForTest()),
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    repository = module.get('CoffeeGrowerEntityRepository');
  });

  afterEach(async () => {
    await repository.query(`DELETE FROM coffee_grower;`);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /coffee-grower', () => {
    it('should create a coffee-grower', async () => {
      await supertest
        .agent(app.getHttpServer())
        .post('/coffee-grower')
        .send({
          name: 'Moises',
          email: 'moises@teste.com.br',
          password: '12345',
        })
        .expect(201);
    });
  });
});
