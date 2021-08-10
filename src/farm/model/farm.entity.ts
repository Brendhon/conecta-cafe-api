import { CoffeeGrowerDTO } from '../../coffee-grower/dto/coffee-grower.dto';
import { CoffeeGrowerEntity } from '../../coffee-grower/model/coffee-grower.entity';
import { BaseEntity } from '../../helpers/common/models/base.entity';
import { Entity, Column, OneToMany, OneToOne, ManyToOne } from 'typeorm';
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

  @Column({ type: 'varchar', length: 300, array: true })
  insecticides: string[];

  @Column({ type: 'varchar', length: 300, array: true })
  fertilizers: string[];

  @OneToMany(() => AddressEntity, (address) => address.farm, { cascade: true })
  address: AddressDTO[];

  @OneToOne(() => ContactEntity, (contact) => contact.farm, { cascade: true })
  contact: ContactDTO;

  @ManyToOne(() => CoffeeGrowerEntity, (grower) => grower.farm, {
    nullable: false,
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  coffeeGrower: CoffeeGrowerDTO;
}

export { FarmEntity };
