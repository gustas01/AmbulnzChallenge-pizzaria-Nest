import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pizzas')
export class Pizza {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ nullable: false, type: 'decimal', precision: 2 })
  price: number;
}
