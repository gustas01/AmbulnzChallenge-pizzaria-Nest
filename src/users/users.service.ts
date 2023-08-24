import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UpdateUserDto } from './dtos/update-user-dto/update-user-dto';
import { RegisterDto } from 'src/auth/dtos/register-dto/register-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user/user';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(data: RegisterDto) {
    try {
      let newUser: User = this.usersRepository.create(data);
      newUser = await this.usersRepository.save(newUser);
      return newUser;
    } catch (error) {
      throw new BadRequestException(error.detail);
    }
  }

  async read(username: string) {
    try{

      const user: User = await this.usersRepository.findOne({
        where: { username },
      });

      if (!user) throw new NotFoundException('Usuário não encontrado!');

      return user;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async update(id: string, data: UpdateUserDto) {}

  async delete(id: string) {}
}
