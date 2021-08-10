import {
  Logger,
  Module,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { FarmModule } from './farm/farm.module';
import { CoffeeGrowerModule } from './coffee-grower/coffee-grower.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './helpers/config/config.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    ConfigModule.forRoot(),
    CoffeeGrowerModule,
    FarmModule,
  ],
})
export class AppModule implements OnModuleInit, OnApplicationShutdown {
  private readonly logger = new Logger(AppModule.name);

  onModuleInit() {
    this.logger.verbose('Running ConectaCafe API');
  }

  onApplicationShutdown() {
    this.logger.warn('Stop ConectaCafe API');
  }
}
