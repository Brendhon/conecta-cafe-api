import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { FarmDTO } from '../dto/farm.dto';
import { FarmEntity } from './farm.entity';

@Entity({ name: 'contact' })
export class ContactEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 300 })
  phone: string;

  @Column({ type: 'varchar', length: 300, default: '' })
  contact_email: string;

  @Column({ type: 'varchar', length: 300, default: '' })
  facebook: string;

  @Column({ type: 'varchar', length: 300, default: '' })
  linkedIn: string;

  @Column({ type: 'varchar', length: 300, default: '' })
  whatsApp: string;

  @Column({ type: 'varchar', length: 300, default: '' })
  youTube: string;

  @Column({ type: 'varchar', length: 300, default: '' })
  instagram: string;

  @Column({ type: 'varchar', length: 300, default: '' })
  twitter: string;

  @OneToOne(() => FarmEntity, (farm) => farm.contact, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'id' })
  farm: FarmDTO;
}
