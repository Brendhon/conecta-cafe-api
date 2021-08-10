import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { FarmDTO } from '../dto/farm.dto';
import { FarmEntity } from './farm.entity';

@Entity({ name: 'contact' })
export class ContactEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  facebook: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  linkedIn: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  whatsApp: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  youTube: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  instagram: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  twitter: string;

  @OneToOne(() => FarmEntity, (farm) => farm.contact, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'id' })
  farm: FarmDTO;
}
