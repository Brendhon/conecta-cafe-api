import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { CoffeeGrowerEntity } from '../../coffee-grower/model/coffee-grower.entity';

class LoginDTO implements Pick<CoffeeGrowerEntity, 'email' | 'password'> {
  @IsEmail()
  @ApiProperty({
    type: String,
    description: 'Email do cafeicultor',
    example: 'moises@teste.com.br',
    required: true,
  })
  email: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Senha de acesso',
    example: '12345',
    required: true,
  })
  password: string;
}

export { LoginDTO };
