import { Controller, Delete, Get, Patch, Req, BadRequestException, UseFilters } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { UpdateUserDto } from './dtos/update-user-dto';
import { UsersService } from './users.service';
import { Request } from 'express';
import { Roles } from 'src/decorators/roles/roles.decorator';
import { Role } from 'src/enums/role/role';
import { User } from './entities/user';
import { UserQueryFailedErrorFilter } from 'src/filters/user-query-failed-error/user-query-failed-error.filter';

@Controller('users')
@UseFilters(UserQueryFailedErrorFilter)
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
  async update(@Req() request: Request, @Body() updateUserDto: UpdateUserDto) {
    if (!Object.keys(updateUserDto).length)
      throw new BadRequestException('Nenhuma informação fornecida para atualização!');

    const user: User = request['user'];

    return this.userService.update(user.id, updateUserDto);
  }

  @Delete()
  async delete(@Req() request: Request) {
    const user: User = request['user'];
    return this.userService.delete(user.id);
  }
}
