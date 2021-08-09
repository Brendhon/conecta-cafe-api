import { BaseEntity } from 'src/helpers/common/models/base.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { AddressDTO } from '../dto/address.dto';
import { AddressEntity } from './address.entity';

@Entity({ name: 'farm' })
class FarmEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  farm_name: string;

  @Column({ type: 'varchar', length: 300 })
  medias: string;

  @Column({ type: 'varchar', length: 10000 })
  history: string;

  @OneToMany(() => AddressEntity, (address) => address.farm, { cascade: true })
  address: AddressDTO[];
}

export { FarmEntity };
