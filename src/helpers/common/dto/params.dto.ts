import { IsDefined, IsString } from 'class-validator';

export class ParamsDTO {
  @IsString()
  @IsDefined()
  id: string;
}
