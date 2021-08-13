import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeController } from './controller/coffee.controller';
import { CoffeeEntity } from './model/coffee.entity';
import { CoffeeService } from './service/coffee.service';

@Module({
  imports: [TypeOrmModule.forFeature([CoffeeEntity])],
  controllers: [CoffeeController],
  providers: [CoffeeService],
})
export class CoffeeModule {}
