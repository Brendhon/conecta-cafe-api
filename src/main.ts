import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['verbose', 'log', 'error', 'warn'],
  });

  // Habilitando cors
  app.enableCors();

  // Adicionando validações
  app.useGlobalPipes(new ValidationPipe());

  // Middlewares
  app.use(urlencoded({ extended: true }));
  app.use(json());

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('ConectaCafé')
    .setDescription('API da aplicação ConectaCafé')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/doc', app, document);

  // Definindo portas
  await app.listen(process.env.PORT);
}
bootstrap();
