import { FarmDTO } from '../../farm/dto/farm.dto';
import { FarmEntity } from '../../farm/model/farm.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../helpers/common/models/base.entity';

@Entity({ name: 'coffee_grower' })
export class CoffeeGrowerEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Column({ type: 'varchar', length: 300, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 300 })
  password: string;

  @OneToMany(() => FarmEntity, (farm) => farm.coffeeGrower)
  farm: FarmDTO[];
}
