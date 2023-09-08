import { Role } from 'src/enums/role/role';
import { Order } from 'src/orders/entities/order';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 60, nullable: true })
  name: string;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column('varchar', { nullable: false, default: [Role.USER], array: true })
  roles: Role[];

  @OneToMany(() => Order, (order) => order.user, { cascade: true })
  order: Order[];
}
