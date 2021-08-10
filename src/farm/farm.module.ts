import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FarmController } from './controller/farm.controller';
import { AddressEntity } from './model/address.entity';
import { ContactEntity } from './model/contact.entity';
import { FarmEntity } from './model/farm.entity';
import { FarmService } from './service/farm.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FarmEntity, AddressEntity, ContactEntity]),
  ],
  controllers: [FarmController],
  providers: [FarmService],
})
export class FarmModule {}
