import { Injectable } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { OrderItem } from './entities/order-item.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PizzasService } from 'src/pizzas/pizzas.service';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem) private orderItemRepository: Repository<OrderItem>,
    private pizzaService: PizzasService,
  ) {}

  async create(createOrderItemDto: CreateOrderItemDto) {
    const pizza = await this.pizzaService.findOne(createOrderItemDto.pizzaname);
    const newOrderItem = this.orderItemRepository.create({
      ...createOrderItemDto,
      pizza,
    });
    return this.orderItemRepository.save(newOrderItem);
  }

  findAll() {
    return `This action returns all orderItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderItem`;
  }

  update(id: number, updateOrderItemDto: UpdateOrderItemDto) {
    return `This action updates a #${id} orderItem`;
  }

  delete(id: number) {
    return `This action removes a #${id} orderItem`;
  }
}
