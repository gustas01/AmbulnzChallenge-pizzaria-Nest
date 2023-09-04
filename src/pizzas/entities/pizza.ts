import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pizzas')
export class Pizza {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column('decimal', { nullable: false, precision: 5, scale: 2 })
  price: number;

  @Column({ nullable: false })
  ingredients: string;
}
