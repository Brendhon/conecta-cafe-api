import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FarmDTO } from '../dto/farm.dto';
import { FarmEntity } from './farm.entity';

@Entity({ name: 'address' })
export class AddressEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 300 })
  street: string;

  @Column({ type: 'varchar', length: 300 })
  city: string;

  @Column({ type: 'varchar', length: 300 })
  country: string;

  @Column({ type: 'varchar', length: 300 })
  uf: string;

  @ManyToOne(() => FarmEntity, (farm) => farm.address)
  farm: FarmDTO;
}