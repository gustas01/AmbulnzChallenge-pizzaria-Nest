import { Controller, Delete, Get, Put, Req } from '@nestjs/common';
import { UUID } from 'crypto';
import { ParseUUIDPipe } from '@nestjs/common';
import { Param, Body } from '@nestjs/common';
import { UpdateUserDto } from './dtos/update-user-dto/update-user-dto';
import { UsersService } from './users.service';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: UUID, @Req() request: Request) {
    //se chegar aqui, é porque passou pelo auth.guard e tem um token válido, então pego o id de
    //request['users'].id, invés de param
    return this.userService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id', ParseUUIDPipe) id: UUID, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.userService.delete(id);
  }
}
