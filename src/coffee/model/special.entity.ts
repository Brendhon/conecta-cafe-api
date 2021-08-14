import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { CoffeeDTO } from '../dto/coffee.dto';
import { CoffeeEntity } from './coffee.entity';

@Entity({ name: 'special' })
export class SpecialCoffeeEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 300, nullable: true, default: null })
  aroma: string;

  @Column({ type: 'varchar', length: 300, nullable: true, default: null })
  flavor: string;

  @Column({ type: 'varchar', length: 300, nullable: true, default: null })
  completion: string;

  @Column({ type: 'varchar', length: 300, nullable: true, default: null })
  acidity: string;

  @Column({ type: 'varchar', length: 300, nullable: true, default: null })
  body: string;

  @Column({ type: 'varchar', length: 300, nullable: true, default: null })
  sweetness: string;

  @OneToOne(() => CoffeeEntity, (coffee) => coffee.special, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'id' })
  coffee: CoffeeDTO;
}
