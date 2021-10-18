import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { FarmDTO } from '../../farm/dto/farm.dto';
import { CoffeeEntity } from '../model/coffee.entity';
import { SpecialCoffeeDTO } from './special.dto';

export class CoffeeDTO implements CoffeeEntity {
  farm: FarmDTO;
  farmId: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Variedade do café',
    example: 'Catuaí vermelho',
  })
  variety: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Espécie do café',
    example: '100% Arábica',
  })
  species: string;

  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'Altitudes onde é plantado o café',
    example: 1300,
  })
  altitude: number;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Tipo de secagem',
    example: 'Natural',
  })
  process: string;

  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'Safra',
    example: 2020,
  })
  harvest: number;

  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'Valor da safra',
    example: 1200,
  })
  harvestValue: number;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => SpecialCoffeeDTO)
  @ApiProperty({ type: SpecialCoffeeDTO, required: false })
  special: SpecialCoffeeDTO;
}
