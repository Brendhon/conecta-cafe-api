import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'contact' })
export class ContactEntity {
  @PrimaryGeneratedColumn()
  id: number;

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
}
