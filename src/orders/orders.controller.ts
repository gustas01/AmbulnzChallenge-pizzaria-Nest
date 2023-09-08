import { Controller, Req, Get } from '@nestjs/common';
import { Request } from 'express';
import { Roles } from 'src/decorators/roles/roles.decorator';
import { Role } from 'src/enums/role/role';
import { OrdersService } from './orders.service';
import { User } from 'src/users/entities/user/user';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Roles(Role.USER)
  @Get()
  async findAll(@Req() request: Request) {
    const { id, name, username, roles } = request['user'];
    return this.ordersService.findAll({ id, name, username, roles } as User);
  }
}
