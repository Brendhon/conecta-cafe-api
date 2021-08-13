import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { CoffeeDTO } from '../dto/coffee.dto';
import { CoffeeEntity } from './coffee.entity';

@Entity({ name: 'special' })
export class SpecialCoffeeEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  aroma: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  flavor: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  completion: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  acidity: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  body: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  sweetness: string;

  @OneToOne(() => CoffeeEntity, (coffee) => coffee.special, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'id' })
  coffee: CoffeeDTO;
}
