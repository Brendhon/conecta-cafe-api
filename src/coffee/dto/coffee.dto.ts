import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { FarmDTO } from 'src/farm/dto/farm.dto';
import { CoffeeEntity } from '../model/coffee.entity';
import { SpecialCoffeeDTO } from './special.dto';

export class CoffeeDTO implements CoffeeEntity {
  farm: FarmDTO;
  farmId: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Variedade do café',
    example: 'Arábica',
  })
  variety: string;

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

  @ValidateNested()
  @Type(() => SpecialCoffeeDTO)
  @ApiProperty({ type: SpecialCoffeeDTO, required: false })
  special?: SpecialCoffeeDTO;
}