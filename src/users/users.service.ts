import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dtos/update-user-dto/update-user-dto';
import { RegisterDto } from 'src/auth/dtos/register-dto/register-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user/user';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(registerDto: RegisterDto) {
    let newUser: User = this.usersRepository.create(registerDto);
    newUser.password = await bcrypt.hash(registerDto.password, await bcrypt.genSalt(10));
    newUser = await this.usersRepository.save(newUser);
    return newUser;
  }

  async read(username: string) {
    const user: User = await this.usersRepository.findOne({
      where: { username },
    });

    if (!user) throw new NotFoundException('Usuário não encontrado!');

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {}

  async delete(id: string) {}
}
