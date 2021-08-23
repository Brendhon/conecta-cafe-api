import { CoffeeGrowerDTO } from '../../coffee-grower/dto/coffee-grower.dto';
import { CoffeeGrowerEntity } from '../../coffee-grower/model/coffee-grower.entity';
import { BaseEntity } from '../../helpers/common/models/base.entity';
import {
  Entity,
  Column,
  OneToOne,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { AddressDTO } from '../dto/address.dto';
import { ContactDTO } from '../dto/contact.dto';
import { AddressEntity } from './address.entity';
import { ContactEntity } from './contact.entity';
import { CoffeeDTO } from '../../coffee/dto/coffee.dto';
import { CoffeeEntity } from '../../coffee/model/coffee.entity';

@Entity({ name: 'farm' })
class FarmEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  farm_name: string;

  @Column({ type: 'varchar', length: 500, array: true, default: [] })
  medias: string[];

  @Column({ type: 'varchar' })
  history: string;

  @Column({ type: 'varchar', length: 300, array: true })
  insecticides: string[];

  @Column({ type: 'varchar', length: 300, array: true })
  fertilizers: string[];

  @OneToOne(() => AddressEntity, (address) => address.farm, { cascade: true })
  address: AddressDTO;

  @OneToOne(() => ContactEntity, (contact) => contact.farm, { cascade: true })
  contact: ContactDTO;

  @OneToMany(() => CoffeeEntity, (coffee) => coffee.farm, { cascade: true })
  coffee: CoffeeDTO[];

  @ManyToOne(() => CoffeeGrowerEntity, (grower) => grower.farm, {
    nullable: false,
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'coffeeGrowerId' })
  coffeeGrower: CoffeeGrowerDTO;

  @Column('uuid')
  public coffeeGrowerId: string;
}

export { FarmEntity };
