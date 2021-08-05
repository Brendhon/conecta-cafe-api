import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../helpers/common/models/base.entity';

@Entity({ name: 'coffee_grower' })
export class CoffeeGrowerEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Column({ type: 'varchar', length: 300, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 300 })
  password: string;
}
