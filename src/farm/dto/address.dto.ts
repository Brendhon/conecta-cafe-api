import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';
import { Constants } from 'src/helpers/common/constants/constants';
import { AddressEntity } from '../model/address.entity';
import { FarmEntity } from '../model/farm.entity';

export class AddressDTO implements AddressEntity {
  id: number;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Farm street',
    example: 'Rua dos Pinheiros, Taguá',
    required: true,
  })
  street: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Farm city',
    example: 'Ouro Fino',
    required: true,
  })
  city: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Farm country',
    example: 'Brasil',
    required: true,
  })
  country: string;

  @IsString()
  @Matches(Constants.REGEX_UF, { message: 'Should be a valid UF format' })
  @ApiProperty({
    type: String,
    description: 'Farm uf',
    example: 'MG',
    required: true,
  })
  uf: string;

  farm: FarmEntity;
}
