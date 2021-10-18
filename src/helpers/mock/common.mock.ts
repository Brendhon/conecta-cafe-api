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

  static readonly MOCK_SECOND_COFFEE_GROWER: Omit<CoffeeGrowerDTO, 'farm'> = {
    name: 'Moises',
    email: 'moises@testee.com.br',
    password: '123456',
  };

  static readonly INVALID_TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImY0OTU0MzhkLTk4NjYtNGU2ZC1iNWQ2LTQ4YjdhMDVjN2ExMiIsImlhdCI6MTYzMDE2Njk3NywiZXhwIjoxNjMwMzM5Nzc3fQ.rYAqmG3v6vXe_jDBG4u89ns_NQMU5ysGowkvrSAZIwM';

  static readonly INVALID_ID = 'd6d5a7b4-5953-4cfb-8ee7-f2eb6745ea1d';

  static readonly MOCK_FARM = {
    farm_name: 'Sitio paraíso',
    address: {
      street: 'Rua dos Pinheiros, Taguá',
      district: 'Delcides Teles',
      city: 'Ouro Fino',
      country: 'Brasil',
      uf: 'MG',
    },
    contact: {
      phone: '+553534453539',
      contact_email: 'farm@farm.com.br',
      facebook: 'string',
      linkedIn: 'string',
      whatsApp: 'string',
      youTube: 'string',
      instagram: 'string',
      twitter: 'string',
    },
    medias: ['teste', 'teste'],
    history:
      'A história teve início com a chegada dos imigrantes Italianos ao sul de Minas, com a passar do tempo, um neto dos imigrantes Italianos casou e formou uma familia no bairro do Taguá, depois de muito trabalho, adquiriu muitas terras, essas terras foram divididas após sua morte, seus filhos seguiram os passos de seu pai. Hoje cada filho administra suas próprias terras.',
    insecticides: ['Natural'],
    fertilizers: ['Organic'],
  };
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
