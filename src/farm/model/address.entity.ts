import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { FarmDTO } from '../dto/farm.dto';
import { FarmEntity } from './farm.entity';

@Entity({ name: 'address' })
export class AddressEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 300 })
  street: string;

  @Column({ type: 'varchar', length: 300 })
  district: string;

  @Column({ type: 'varchar', length: 300 })
  city: string;

  @Column({ type: 'varchar', length: 300 })
  country: string;

  @Column({ type: 'varchar', length: 300 })
  uf: string;

  @OneToOne(() => FarmEntity, (farm) => farm.contact, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'id' })
  farm: FarmDTO;
}
