import { DeleteResult, UpdateResult } from 'typeorm';

export abstract class MockConstants {
  static readonly MOCK_UPDATE_SERVICE: UpdateResult = {
    affected: 1,
    generatedMaps: [],
    raw: [],
  };

  static readonly MOCK_DELETE_SERVICE: DeleteResult = { affected: 1, raw: [] };
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
