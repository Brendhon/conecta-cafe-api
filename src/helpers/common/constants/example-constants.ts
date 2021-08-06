import { CoffeeGrowerEntity } from 'src/coffee-grower/model/coffee-grower.entity';
import { UpdateResult } from 'typeorm';

export abstract class ConstantsExample {
  static readonly MOCK_BODY_COFFEE_GROWER: CoffeeGrowerEntity = {
    name: 'Moises',
    email: 'moises@teste.com.br',
    password: '1245',
  };

  static readonly MOCK_SERVICE_TO_CREATE_GROWERS = {
    message: 'Create with success',
  };

  static readonly MOCK_SERVICE_TO_UPDATE_GROWERS: UpdateResult = {
    affected: 1,
    generatedMaps: [],
    raw: [],
  };

  static readonly MOCK_SERVICE_TO_FIND_ALL_GROWERS = [
    {
      id: 'b9280405-8312-4bc6-beb9-041898aa85a0',
      createDateTime: '2021-08-06T17:23:02.905Z',
      lastChangedDateTime: '2021-08-06T18:09:58.340Z',
      name: 'Moisess',
      email: 'moises@testeeeeeeee.com.br',
      password: '12345',
    },
    {
      id: 'f59a6741-5c85-40c5-85fa-11cad40917cb',
      createDateTime: '2021-08-06T17:23:06.335Z',
      lastChangedDateTime: '2021-08-06T18:16:43.372Z',
      name: 'Moisess',
      email: 'moises@testeeeeeee.com.br',
      password: '12345',
    },
    {
      id: '0a565ced-d05a-4e66-b1bc-ce1852812f91',
      createDateTime: '2021-08-06T18:25:40.049Z',
      lastChangedDateTime: '2021-08-06T18:33:14.924Z',
      name: 'Moises',
      email: 'moises@teste.com.br',
      password: '12345',
    },
  ];

  static readonly MOCK_SERVICE_TO_FIND_ONE_GROWERS: CoffeeGrowerEntity = {
    name: 'Moises',
    email: 'moises@teste.com.br',
    password: '12345',
  };
}
