import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { CoffeeGrowerEntity } from 'src/models/coffee-grower.entity';

export class CoffeeGrowerDTO implements CoffeeGrowerEntity {
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
    description: 'Senha de acesso do cafeicultor',
    example: '12345',
    required: true,
  })
  password: string;

  id: string;
  createDateTime: Date;
  lastChangedDateTime: Date;
}
