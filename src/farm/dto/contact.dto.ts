import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, IsString } from 'class-validator';
import { ContactEntity } from '../model/contact.entity';

export class ContactDTO implements ContactEntity {
  id: number;

  @IsString()
  @IsPhoneNumber()
  @ApiProperty({
    type: String,
    description: 'Contact phone',
    example: '+553534453539',
  })
  phone: string;

  @ApiProperty({
    type: String,
    description: 'Facebook',
    required: false,
  })
  facebook: string;

  @ApiProperty({
    type: String,
    description: 'LinkedIn',
    required: false,
  })
  linkedIn: string;

  @ApiProperty({
    type: String,
    description: 'WhatsApp',
    required: false,
  })
  whatsApp: string;

  @ApiProperty({
    type: String,
    description: 'YouTube',
    required: false,
  })
  youTube: string;

  @ApiProperty({
    type: String,
    description: 'Instagram',
    required: false,
  })
  instagram: string;

  @ApiProperty({
    type: String,
    description: 'Twitter',
    required: false,
  })
  twitter: string;
}
