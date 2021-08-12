import { DeleteResult, UpdateResult } from 'typeorm';
import { FarmEntity } from '../../farm/model/farm.entity';
import { HeaderDTO } from '../../farm/dto/headers.dto';

export abstract class MockFarm {
  static readonly BODY: FarmEntity = new FarmEntity();

  static readonly HEADERS: HeaderDTO = {
    authorization: '',
  };

  static readonly SERVICE_TO_CREATE = {
    message: 'Create with success',
  };

  static readonly SERVICE_TO_UPDATE: UpdateResult = {
    affected: 1,
    generatedMaps: [],
    raw: [],
  };

  static readonly SERVICE_TO_DELETE: DeleteResult = {
    affected: 1,
    raw: [],
  };

  static readonly SERVICE_TO_FIND_ALL: FarmEntity[];

  static readonly SERVICE_TO_FIND_ONE: FarmEntity = new FarmEntity();
}
