import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { ContactEntity } from '../model/contact.entity';
import { FarmEntity } from '../model/farm.entity';

export class ContactDTO implements ContactEntity {
  farm: FarmEntity;
  id: string;

  @IsString()
  @IsPhoneNumber()
  @ApiProperty({
    type: String,
    description: 'Telefone de contato da fazenda',
    example: '+553534453539',
  })
  phone: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({
    type: String,
    description: 'Email de contato da fazenda',
    example: 'farm@farm.com.br',
    required: false,
  })
  contact_email: string;

  @IsOptional()
  @ApiProperty({
    type: String,
    description: 'Facebook',
    required: false,
  })
  facebook: string;

  @IsOptional()
  @ApiProperty({
    type: String,
    description: 'LinkedIn',
    required: false,
  })
  linkedIn: string;

  @IsOptional()
  @ApiProperty({
    type: String,
    description: 'WhatsApp',
    required: false,
  })
  whatsApp: string;

  @IsOptional()
  @ApiProperty({
    type: String,
    description: 'YouTube',
    required: false,
  })
  youTube: string;

  @IsOptional()
  @ApiProperty({
    type: String,
    description: 'Instagram',
    required: false,
  })
  instagram: string;

  @IsOptional()
  @ApiProperty({
    type: String,
    description: 'Twitter',
    required: false,
  })
  twitter: string;
}
