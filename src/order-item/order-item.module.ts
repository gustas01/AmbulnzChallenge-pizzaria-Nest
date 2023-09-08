import { Module } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { OrderItemController } from './order-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './entities/order-item.entity';
import { PizzasModule } from 'src/pizzas/pizzas.module';
import { OrdersModule } from 'src/orders/orders.module';

@Module({
  imports: [PizzasModule, OrdersModule, TypeOrmModule.forFeature([OrderItem])],
  controllers: [OrderItemController],
  providers: [OrderItemService],
})
export class OrderItemModule {}
