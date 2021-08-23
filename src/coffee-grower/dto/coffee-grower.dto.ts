import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CoffeeGrowerEntity } from '../model/coffee-grower.entity';
import { FarmDTO } from '../../farm/dto/farm.dto';

class CoffeeGrowerDTO implements CoffeeGrowerEntity {
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Coffee grower name',
    example: 'Moises',
    required: true,
  })
  name: string;

  @IsEmail()
  @ApiProperty({
    type: String,
    description: 'Coffee grower email',
    example: 'moises@teste.com.br',
    required: true,
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Coffee grower access password',
    example: '12345',
    required: true,
  })
  password: string;

  farm: FarmDTO[];
}

class CoffeeGrowerUpdateDTO implements Omit<CoffeeGrowerEntity, 'farm'> {
  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Coffee grower name',
    example: 'Moises',
    required: false,
  })
  name: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({
    type: String,
    description: 'Coffee grower email',
    example: 'moises@teste.com.br',
    required: false,
  })
  email: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Coffee grower access password',
    example: '12345',
    required: false,
  })
  password: string;
}

export { CoffeeGrowerDTO, CoffeeGrowerUpdateDTO };
