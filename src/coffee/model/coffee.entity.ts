import { FarmDTO } from '../../farm/dto/farm.dto';
import { FarmEntity } from '../../farm/model/farm.entity';
import { Entity, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../../helpers/common/models/base.entity';
import { SpecialCoffeeEntity } from './special.entity';
import { SpecialCoffeeDTO } from '../dto/special.dto';

@Entity({ name: 'coffee' })
export class CoffeeEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  variety: string;

  @Column({ type: 'integer' })
  altitude: number;

  @Column({ type: 'integer' })
  harvest: number;

  @Column({ type: 'varchar', length: 300 })
  process: string;

  @Column({ type: 'integer' })
  harvestValue: number;

  @OneToOne(() => SpecialCoffeeEntity, (special) => special.coffee, {
    cascade: true,
  })
  special?: SpecialCoffeeDTO;

  @ManyToOne(() => FarmEntity, (farm) => farm.coffee, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'farmId' })
  farm: FarmDTO;

  @Column('uuid')
  public farmId: string;
}
