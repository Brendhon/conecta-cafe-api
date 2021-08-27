import { IsDefined, IsUUID } from 'class-validator';

export class ParamsDTO {
  @IsUUID()
  @IsDefined()
  id: string;
}
