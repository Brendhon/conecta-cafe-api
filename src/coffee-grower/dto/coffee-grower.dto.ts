import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CoffeeGrowerEntity } from '../model/coffee-grower.entity';
import { FarmDTO } from '../../farm/dto/farm.dto';

class CoffeeGrowerDTO implements CoffeeGrowerEntity {
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Nome do cafeicultor',
    example: 'Moises',
    required: true,
  })
  name: string;

  @IsEmail()
  @ApiProperty({
    type: String,
    description: 'Email do cafeicultor',
    example: 'moises@teste.com.br',
    required: true,
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Senha de acesso',
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
    description: 'Nome do cafeicultor',
    example: 'Moises',
    required: false,
  })
  name: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({
    type: String,
    description: 'Email do cafeicultor',
    example: 'moises@teste.com.br',
    required: false,
  })
  email: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Senha de acesso',
    example: '12345',
    required: false,
  })
  password: string;
}

export { CoffeeGrowerDTO, CoffeeGrowerUpdateDTO };
