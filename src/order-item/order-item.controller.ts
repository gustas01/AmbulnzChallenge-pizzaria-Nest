import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { Request } from 'express';
import { Roles } from 'src/decorators/roles/roles.decorator';
import { Role } from 'src/enums/role/role';
import { User } from 'src/users/entities/user/user';

@Controller('order-item')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Roles(Role.USER)
  @Post()
  create(@Req() request: Request, @Body() createOrderItemDto: CreateOrderItemDto) {
    const { id, name, username, roles } = request['user'];

    return this.orderItemService.create({ id, name, username, roles } as User, createOrderItemDto);
  }

  @Get()
  findAll() {
    return this.orderItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderItemDto: UpdateOrderItemDto) {
    return this.orderItemService.update(id, updateOrderItemDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.orderItemService.delete(id);
  }
}
