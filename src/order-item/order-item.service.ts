import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PizzasService } from 'src/pizzas/pizzas.service';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { OrderItem } from './entities/order-item.entity';

import { Order } from 'src/orders/entities/order';
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

  async findAll(user: User) {
    const order = await this.ordersService.findOne(user);
    return this.orderItemRepository.find({
      relations: { pizza: true, order: true },
      where: { order } as FindOptionsWhere<Order>,
    });
  }

  async update(id: string, updateOrderItemDto: UpdateOrderItemDto) {
    if (!Object.keys(updateOrderItemDto).length)
      throw new BadRequestException('Nenhuma informação fornecida para atualização!');

    let pizza = undefined;
    if (updateOrderItemDto.pizzaname)
      pizza = await this.pizzaService.findOne(updateOrderItemDto.pizzaname);

    const orderItem = await this.orderItemRepository.findOneBy({ id });
    if (!orderItem) throw new NotFoundException('ID inválido');

    await this.orderItemRepository.update(id, { quantity: updateOrderItemDto.quantity, pizza });
    return { msg: 'Ordem atualizada com sucesso!' };
  }

  async delete(id: string) {
    await this.orderItemRepository.delete(id);
    return { msg: 'Item apagado!' };
  }
}
