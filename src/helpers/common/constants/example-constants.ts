import { CoffeeGrowerEntity } from '../../../coffee-grower/model/coffee-grower.entity';

export abstract class ConstantsExample {
  static readonly COFFEE_GROWER_EXAMPLE: CoffeeGrowerEntity = {
    name: 'Moises',
    email: 'moises@teste.com.br',
    password: '12345',
  };
}
