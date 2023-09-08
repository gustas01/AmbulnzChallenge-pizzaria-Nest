import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user/user';
import { Order } from './entities/order';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(@InjectRepository(Order) private orderRepository: Repository<Order>) {}

  create() {
    return this.orderRepository.create();
  }

  async findOne(user: User) {
    return this.orderRepository.findOneBy({ paidOff: false, user } as FindOptionsWhere<User>);
  }

  async findAll(user: User) {
    return this.orderRepository.findOneBy({ user } as FindOptionsWhere<User>);
  }
}
