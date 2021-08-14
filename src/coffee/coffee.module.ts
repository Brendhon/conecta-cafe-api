import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FarmEntity } from '../farm/model/farm.entity';
import { FarmService } from '../farm/service/farm.service';
import { CoffeeController } from './controller/coffee.controller';
import { CoffeeEntity } from './model/coffee.entity';
import { CoffeeService } from './service/coffee.service';

@Module({
  imports: [TypeOrmModule.forFeature([CoffeeEntity, FarmEntity])],
  controllers: [CoffeeController],
  providers: [CoffeeService, FarmService],
})
export class CoffeeModule {}
