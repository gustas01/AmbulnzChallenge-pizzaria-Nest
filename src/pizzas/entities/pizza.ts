import { ColumnNumericTransformer } from 'src/transformers/column-numeric-transformer/column-numeric-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pizzas')
export class Pizza {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column('decimal', {
    nullable: false,
    precision: 5,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  price: number;

  @Column('varchar', { nullable: false, array: true })
  ingredients: string[];
}
