import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, ValidateNested } from 'class-validator';
import { FarmEntity } from '../model/farm.entity';
import { AddressDTO } from './address.dto';
import { Type } from 'class-transformer';

class FarmDTO implements FarmEntity {
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Farm name',
    example: 'Sitio paraíso',
    required: true,
  })
  farm_name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AddressDTO)
  @ApiProperty({ type: [AddressDTO] })
  address: AddressDTO[];

  @ApiProperty({
    type: String,
    description: 'Farm photos',
    required: true,
  })
  medias: string;

  @ApiProperty({
    type: String,
    description: 'Farm history',
    example: `A história teve início com a chegada dos imigrantes Italianos ao sul de Minas, com a passar do tempo, um neto dos imigrantes Italianos casou e formou uma familia no bairro do Taguá, depois de muito trabalho, adquiriu muitas terras, essas terras foram divididas após sua morte, seus filhos seguiram os passos de seu pai. Hoje cada filho administra suas próprias terras.`,
  })
  history: string;
}

export { FarmDTO };
