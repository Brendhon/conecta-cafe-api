import { CoffeeGrowerDTO } from 'src/coffee-grower/dto/coffee-grower.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

export abstract class MockConstants {
  static readonly MOCK_UPDATE_SERVICE: UpdateResult = {
    affected: 1,
    generatedMaps: [],
    raw: [],
  };

  static readonly MOCK_DELETE_SERVICE: DeleteResult = { affected: 1, raw: [] };

  static readonly MOCK_COFFEE_GROWER: Omit<CoffeeGrowerDTO, 'farm'> = {
    name: 'Moises',
    email: 'moises@teste.com.br',
    password: '12345',
  };

  static readonly INVALID_TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImY0OTU0MzhkLTk4NjYtNGU2ZC1iNWQ2LTQ4YjdhMDVjN2ExMiIsImlhdCI6MTYzMDE2Njk3NywiZXhwIjoxNjMwMzM5Nzc3fQ.rYAqmG3v6vXe_jDBG4u89ns_NQMU5ysGowkvrSAZIwM';
}

/**
 * @param T Classe
 * @returns Novo objeto para aquela classe
 */
export class MockFactory {
  create<T>(type: new () => T): T {
    return new type();
  }
}
