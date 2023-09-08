import { User } from 'src/users/entities/user/user';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: false })
  paidOff: boolean;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;
}
