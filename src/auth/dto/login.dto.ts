import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { CoffeeGrowerEntity } from 'src/coffee-grower/model/coffee-grower.entity';

class LoginDTO implements Pick<CoffeeGrowerEntity, 'email' | 'password'> {
  @IsEmail()
  @ApiProperty({
    type: String,
    description: 'Coffee grower email',
    example: 'moises@teste.com.br',
    required: true,
  })
  email: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Coffee grower access password',
    example: '12345',
    required: true,
  })
  password: string;
}

export { LoginDTO };
