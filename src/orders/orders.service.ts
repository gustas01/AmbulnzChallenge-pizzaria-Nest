import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Order } from './entities/order';

@Injectable()
export class OrdersService {
  constructor(@InjectRepository(Order) private orderRepository: Repository<Order>) {}

  async create() {
    return this.orderRepository.create();
  }

  async findOne(user: User) {
    return this.orderRepository.findOneBy({ paidOff: false, user } as FindOptionsWhere<User>);
  }

  async findAll(user: User) {
    return this.orderRepository.find({ where: { user } as FindOptionsWhere<User> });
  }
}
