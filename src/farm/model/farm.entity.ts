import { BaseEntity } from 'src/helpers/common/models/base.entity';
import { Entity, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { AddressDTO } from '../dto/address.dto';
import { ContactDTO } from '../dto/contact.dto';
import { AddressEntity } from './address.entity';
import { ContactEntity } from './contact.entity';

@Entity({ name: 'farm' })
class FarmEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  farm_name: string;

  @Column({ type: 'varchar', length: 300 })
  medias: string;

  @Column({ type: 'varchar', length: 10000 })
  history: string;

  @Column({ type: 'varchar', length: 300 })
  insecticides: string;

  @Column({ type: 'varchar', length: 300 })
  fertilizers: string;

  @OneToMany(() => AddressEntity, (address) => address.farm, { cascade: true })
  address: AddressDTO[];

  @OneToOne(() => ContactEntity, { cascade: true })
  @JoinColumn()
  contact: ContactDTO;
}

export { FarmEntity };
