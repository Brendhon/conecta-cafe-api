import { Entity, Column, Unique } from 'typeorm';
import { BaseEntity } from '../../helpers/common/models/base.entity';

@Entity({ name: 'coffee_grower' })
@Unique(['email'])
export class CoffeeGrowerEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Column({ type: 'varchar', length: 300 })
  email: string;

  @Column({ type: 'varchar', length: 300 })
  password: string;
}
