import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';
import { Constants } from '../../helpers/common/constants/constants';
import { AddressEntity } from '../model/address.entity';
import { FarmDTO } from './farm.dto';

export class AddressDTO implements AddressEntity {
  id: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Endereço',
    example: 'Rua dos Pinheiros, Taguá',
    required: true,
  })
  street: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Bairro da fazenda',
    example: 'Delcides Teles',
    required: true,
  })
  district: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Cidade',
    example: 'Ouro Fino',
    required: true,
  })
  city: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'País',
    example: 'Brasil',
    required: true,
  })
  country: string;

  @IsString()
  @Matches(Constants.REGEX_UF, { message: 'Should be a valid UF format' })
  @ApiProperty({
    type: String,
    description: 'UF',
    example: 'MG',
    required: true,
  })
  uf: string;

  farm: FarmDTO;
}
