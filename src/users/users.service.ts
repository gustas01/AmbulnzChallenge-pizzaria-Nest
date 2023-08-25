import {
  Injectable,
  NotFoundException,
  BadRequestException,
  HttpStatus,
  HttpException,
  UseFilters,
} from '@nestjs/common';
import { UpdateUserDto } from './dtos/update-user-dto/update-user-dto';
import { RegisterDto } from 'src/auth/dtos/register-dto/register-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user/user';
import { QueryFailedError, Repository, TypeORMError } from 'typeorm';
import { QueryFailedErrorFilter } from 'src/filters/query-failed-error/query-failed-error.filter';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(data: RegisterDto) {
    let newUser: User = this.usersRepository.create(data);
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

  async update(id: string, data: UpdateUserDto) {}

  async delete(id: string) {}
}
