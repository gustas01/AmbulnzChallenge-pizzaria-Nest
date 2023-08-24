import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto } from './dtos/sign-in-dto/sign-in-dto';
import { RegisterDto } from './dtos/register-dto/register-dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async signIn(@Body() data: SignInDto) {
    return this.authService.signIn(data);
  }

  @Post('register')
  async register(@Body() data: RegisterDto) {
    return this.authService.register(data);
  }
}
