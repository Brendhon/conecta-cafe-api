import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { SpecialCoffeeEntity } from '../model/special.entity';
import { CoffeeDTO } from './coffee.dto';

export class SpecialCoffeeDTO implements SpecialCoffeeEntity {
  coffee: CoffeeDTO;
  id: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Aroma',
    required: false,
  })
  aroma: string;

  @ApiProperty({
    type: String,
    description: 'Sabor',
    required: false,
  })
  flavor: string;

  @ApiProperty({
    type: String,
    description: 'Finalização',
    required: false,
  })
  completion: string;

  @ApiProperty({
    type: String,
    description: 'Acidez',
    required: false,
  })
  acidity: string;

  @ApiProperty({
    type: String,
    description: 'Corpo',
    required: false,
  })
  body: string;

  @ApiProperty({
    type: String,
    description: 'Doçura',
    required: false,
  })
  sweetness: string;
}
