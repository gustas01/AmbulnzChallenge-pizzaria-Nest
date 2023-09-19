import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { Roles } from 'src/decorators/roles/roles.decorator';
import { Role } from 'src/enums/role/role';
import { User } from 'src/users/entities/user';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { OrderItemService } from './order-item.service';

@Controller('order-item')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Roles(Role.USER)
  @Post()
  create(@Req() request: Request, @Body() createOrderItemDto: CreateOrderItemDto) {
    const { id, name, username, roles } = request['user'];

    return this.orderItemService.create({ id, name, username, roles } as User, createOrderItemDto);
  }

  @Roles(Role.USER)
  @Get()
  findAll(@Req() request: Request) {
    const { id, name, username, roles } = request['user'];
    return this.orderItemService.findAll({ id, name, username, roles } as User);
  }

  @Roles(Role.USER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderItemDto: UpdateOrderItemDto) {
    return this.orderItemService.update(id, updateOrderItemDto);
  }

  @Roles(Role.USER)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.orderItemService.delete(id);
  }
}
