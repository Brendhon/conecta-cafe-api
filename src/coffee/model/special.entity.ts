import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { CoffeeDTO } from '../dto/coffee.dto';
import { CoffeeEntity } from './coffee.entity';

@Entity({ name: 'special' })
export class SpecialCoffeeEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 300, default: '' })
  aroma: string;

  @Column({ type: 'varchar', length: 300, default: '' })
  flavor: string;

  @Column({ type: 'varchar', length: 300, default: '' })
  completion: string;

  @Column({ type: 'varchar', length: 300, default: '' })
  acidity: string;

  @Column({ type: 'varchar', length: 300, default: '' })
  body: string;

  @Column({ type: 'varchar', length: 300, default: '' })
  sweetness: string;

  @OneToOne(() => CoffeeEntity, (coffee) => coffee.special, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'id' })
  coffee: CoffeeDTO;
}
