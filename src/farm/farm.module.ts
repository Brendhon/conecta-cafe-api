import { Module } from '@nestjs/common';
import { FarmController } from './controller/farm.controller';
import { FarmService } from './service/farm.service';

@Module({
  controllers: [FarmController],
  providers: [FarmService],
})
export class FarmModule {}
