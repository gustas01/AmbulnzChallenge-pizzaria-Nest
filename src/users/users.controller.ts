import { Controller, Delete, Get, Patch, Req } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { UpdateUserDto } from './dtos/update-user-dto/update-user-dto';
import { UsersService } from './users.service';
import { Request } from 'express';
import { Roles } from 'src/decorators/roles/roles.decorator';
import { Role } from 'src/enums/role/role';
import { User } from './entities/user/user';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Roles(Role.USER)
  @Get()
  async findOne(@Req() request: Request) {
    const user: User = request['user'];
    return this.userService.findOne(user.username);
  }

  @Roles(Role.USER)
  @Patch()
  async update(@Req() request: Request, @Body() updateUserDto: Partial<UpdateUserDto>) {
    const user: User = request['user'];
    console.log(user);

    return this.userService.update(user.id, updateUserDto);
  }

  @Delete()
  async delete(@Req() request: Request) {
    const user: User = request['user'];
    return this.userService.delete(user.id);
  }
}
