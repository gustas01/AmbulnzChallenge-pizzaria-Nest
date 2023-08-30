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

  async signIn(signInDto: SignInDto) {
    const user: User = await this.usersService.findOne(signInDto.username);

    if (!user || !(await bcrypt.compare(signInDto.password, user?.password)))
      throw new UnauthorizedException('Usuário ou senha inválidos!');

    const payload = { id: user.id, name: user.name, username: user.username };

    return this.jwtService.sign(payload, {
      expiresIn: String(process.env.JWT_EXPIRATION_DATE),
      subject: user.id,
      issuer: 'login',
      audience: 'users',
    });
  }

  async register(registerDto: RegisterDto) {
    const user = await this.usersService.create(registerDto);
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
