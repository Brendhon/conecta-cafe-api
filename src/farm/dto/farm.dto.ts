import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { FarmEntity } from '../model/farm.entity';
import { AddressDTO } from './address.dto';
import { Type } from 'class-transformer';
import { ContactDTO } from './contact.dto';
import { CoffeeGrowerDTO } from '../../coffee-grower/dto/coffee-grower.dto';
import { CoffeeDTO } from '../../coffee/dto/coffee.dto';

class FarmDTO implements FarmEntity {
  coffeeGrowerId: string;
  coffeeGrower: CoffeeGrowerDTO;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Nome da fazenda',
    example: 'Sitio paraíso',
    required: true,
  })
  farm_name: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AddressDTO)
  @ApiProperty({ type: AddressDTO })
  address: AddressDTO;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ContactDTO)
  @ApiProperty({ type: ContactDTO })
  contact: ContactDTO;

  @IsArray()
  @IsOptional()
  @ApiProperty({
    type: [String],
    description: 'Arquivos de mídias da fazenda (fotos e videos)',
    required: false,
    example: ['firebasestorage.googleapis.com/s3482984v3457345s382984v3457345'],
  })
  medias: string[];

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Historia da fazenda',
    example: `A história teve início com a chegada dos imigrantes Italianos ao sul de Minas, com a passar do tempo, um neto dos imigrantes Italianos casou e formou uma familia no bairro do Taguá, depois de muito trabalho, adquiriu muitas terras, essas terras foram divididas após sua morte, seus filhos seguiram os passos de seu pai. Hoje cada filho administra suas próprias terras.`,
  })
  history: string;

  @IsArray()
  @ApiProperty({
    isArray: true,
    type: [String],
    description: 'Inseticidas',
    example: ['Natural'],
  })
  insecticides: string[];

  @IsArray()
  @ApiProperty({
    type: [String],
    description: 'Fertilizantes',
    example: ['Organic'],
  })
  fertilizers: string[];

  coffee: CoffeeDTO[];
}

export { FarmDTO };
