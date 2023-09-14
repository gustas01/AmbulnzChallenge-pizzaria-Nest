import { Injectable, NotFoundException, Req } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { OrderItem } from './entities/order-item.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PizzasService } from 'src/pizzas/pizzas.service';

import { OrdersService } from 'src/orders/orders.service';
import { User } from 'src/users/entities/user';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem) private orderItemRepository: Repository<OrderItem>,
    private pizzaService: PizzasService,
    private ordersService: OrdersService,
  ) {}

  async create(user: User, createOrderItemDto: CreateOrderItemDto) {
    const pizza = await this.pizzaService.findOne(createOrderItemDto.pizzaname);

    const newOrderItem = this.orderItemRepository.create({
      ...createOrderItemDto,
      pizza,
    });

    newOrderItem.order = await this.ordersService.findOne(user);

    const orderItem = await this.orderItemRepository.save(newOrderItem);
    delete orderItem.pizza.id;
    return orderItem;
  }

  findAll() {
    return this.orderItemRepository.find({ relations: { pizza: true } });
  }

  findOne(id: number) {
    return `This action returns a #${id} orderItem`;
  }

  async update(id: string, updateOrderItemDto: UpdateOrderItemDto) {
    let pizza = undefined;
    if (updateOrderItemDto.pizzaname)
      pizza = await this.pizzaService.findOne(updateOrderItemDto.pizzaname);

    return this.orderItemRepository.update(id, { quantity: updateOrderItemDto.quantity, pizza });
  }

  async delete(id: string) {
    await this.orderItemRepository.delete(id);
    return { msg: 'Item apagado!' };
  }
}
