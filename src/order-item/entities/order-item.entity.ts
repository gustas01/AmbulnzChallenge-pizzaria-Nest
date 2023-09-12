import { Order } from 'src/orders/entities/order';
import { Pizza } from 'src/pizzas/entities/pizza';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orderItem')
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quantity: number;

  @ManyToOne(() => Pizza)
  pizza: Pizza;

  @ManyToOne(() => Order, { onDelete: 'CASCADE' })
  order: Order;
}
