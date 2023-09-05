import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dtos/update-user-dto';
import { CreateUserDto } from 'src/users/dtos/create-user-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user/user';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/enums/role/role';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    const user: Partial<User> = createUserDto;

    if (createUserDto.role) user.roles = this.roleToRoles(createUserDto.role);

    let newUser: User = this.usersRepository.create(user);
    newUser.password = await bcrypt.hash(createUserDto.password, await bcrypt.genSalt(10));
    newUser = await this.usersRepository.save(newUser);
    return newUser;
  }

  async findOne(username: string) {
    const user: User = await this.usersRepository.findOneBy({ username });

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
