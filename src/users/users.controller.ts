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
  async findOne(@Param('id', ParseUUIDPipe) id: UUID) {
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
