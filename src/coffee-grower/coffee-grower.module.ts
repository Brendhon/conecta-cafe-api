import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeGrowerEntity } from 'src/coffee-grower/model/coffee-grower.entity';
import { CoffeeGrowerController } from './controller/coffee-grower.controller';
import { CoffeeGrowerService } from './service/coffee-grower.service';

@Module({
  imports: [TypeOrmModule.forFeature([CoffeeGrowerEntity])],
  controllers: [CoffeeGrowerController],
  providers: [CoffeeGrowerService],
})
export class CoffeeGrowerModule {}
