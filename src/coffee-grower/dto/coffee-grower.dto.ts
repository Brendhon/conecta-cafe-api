import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { CoffeeGrowerEntity } from 'src/coffee-grower/model/coffee-grower.entity';

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
}

// Validações de param e query
class GetOneParams {
  @IsEmail()
  email: string;
}

export { CoffeeGrowerDTO, GetOneParams };
