import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './helpers/common/filters/exception.filter';
import { configService } from './helpers/config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: configService.isProduction()
      ? ['verbose', 'error', 'warn']
      : ['verbose', 'log', 'error', 'warn'],
  });

  // Habilitando cors
  app.enableCors();

  // Usando filtro para mudar o objeto de resposta quando existe uma exceção
  app.useGlobalFilters(new HttpExceptionFilter());

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
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/doc', app, document);

  // Definindo portas
  await app.listen(configService.getPort());
}
bootstrap();
