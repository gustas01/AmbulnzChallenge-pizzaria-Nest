import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/enums/role/role';
import { OrdersService } from 'src/orders/orders.service';
import { CreateUserDto } from 'src/users/dtos/create-user-dto';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dtos/update-user-dto';
import { User } from './entities/user';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private orderService: OrdersService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user: Partial<User> = createUserDto;

    if (createUserDto.role) user.roles = this.roleToRoles(createUserDto.role);

    let newUser: User = this.usersRepository.create({ ...user, order: [] });
    newUser.password = await bcrypt.hash(createUserDto.password, await bcrypt.genSalt(10));
    newUser.order.unshift(await this.orderService.create());
    newUser = await this.usersRepository.save(newUser);

    return newUser;
  }

  async findOne(username: string) {
    const user: User = await this.usersRepository.findOne({
      relations: { order: true },
      where: { username },
    });

    if (!user) throw new NotFoundException('Usuário não encontrado!');

    return user;
  }

  async update(id: string, updateUserDto: Partial<UpdateUserDto>) {
    if (updateUserDto.password)
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, await bcrypt.genSalt(10));

    await this.usersRepository.update(id, updateUserDto);
    return this.usersRepository.findOneBy({ id });
  }

  async delete(id: string) {}

  roleToRoles(role: Role): Role[] {
    const obj = Object.values(Role);
    const index = obj.findIndex((item) => item === role);
    const roles = obj.splice(0, index + 1);
    return roles;
  }
}
