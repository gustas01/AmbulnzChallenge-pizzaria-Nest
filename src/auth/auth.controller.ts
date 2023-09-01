import { Body, Controller, Post, Res, UseFilters } from '@nestjs/common';
import { SignInDto } from './dtos/sign-in-dto/sign-in-dto';
import { CreateUserDto } from '../users/dtos/create-user-dto';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { UserQueryFailedErrorFilter } from 'src/filters/user-query-failed-error/user-query-failed-error.filter';

@Controller('auth')
@UseFilters(UserQueryFailedErrorFilter)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async signIn(@Body() signInDto: SignInDto, @Res({ passthrough: true }) response: Response) {
    response.cookie('token', await this.authService.signIn(signInDto), {
      httpOnly: true,
      secure: true,
      path: '/',
    });

    return {
      msg: 'Usuário autenticado com sucesso',
    };
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
}
