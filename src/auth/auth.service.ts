import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dtos/sign-in-dto/sign-in-dto';
import { RegisterDto } from './dtos/register-dto/register-dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user/user';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async signIn(data: SignInDto) {
    const user: User = await this.usersService.read(data.username);

    if (!user || !(await bcrypt.compare(data.password, user?.password)))
      throw new UnauthorizedException('Usuário ou senha inválidos!');

    const payload = { id: user.id, name: user.name, username: user.username };

    return {
      token: this.jwtService.sign(payload, {
        expiresIn: '7d',
        subject: user.id,
        issuer: 'login',
        audience: 'users',
      }),
    };
  }

  async register(data: RegisterDto) {
    const user = await this.usersService.create(data);
    return user;
  }

  verifyToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        issuer: 'login',
        audience: 'users',
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
