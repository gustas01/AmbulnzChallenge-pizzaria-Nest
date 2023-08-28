import { Body, Controller, Post, Res } from '@nestjs/common';
import { SignInDto } from './dtos/sign-in-dto/sign-in-dto';
import { RegisterDto } from './dtos/register-dto/register-dto';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async signIn(@Body() data: SignInDto, @Res({ passthrough: true }) response: Response) {
    response.cookie('token', await this.authService.signIn(data), {
      httpOnly: true,
      secure: true,
      path: '/',
    });

    return {
      msg: 'Usuário autenticado com sucesso',
    };
  }

  @Post('register')
  async register(@Body() data: RegisterDto) {
    return this.authService.register(data);
  }
}
