import { Controller, Delete, Get, Put } from '@nestjs/common';
import { UUID } from 'crypto';
import { ParseUUIDPipe } from '@nestjs/common';
import { Param, Body } from '@nestjs/common';
import { UpdateUserDto } from './dtos/update-user-dto/update-user-dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get(':id')
  async read(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.userService.read(id);
  }

  @Put(':id')
  async update(@Param('id', ParseUUIDPipe) id: UUID, @Body() data: UpdateUserDto) {
    return this.userService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.userService.delete(id);
  }
}
