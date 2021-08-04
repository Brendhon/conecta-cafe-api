import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeGrowerEntity } from 'src/models/coffee-grower.entity';
import { CoffeeGrowerController } from './coffee-grower.controller';
import { CoffeeGrowerService } from './coffee-grower.service';

@Module({
  imports: [TypeOrmModule.forFeature([CoffeeGrowerEntity])],
  controllers: [CoffeeGrowerController],
  providers: [CoffeeGrowerService],
})
export class CoffeeGrowerModule {}
