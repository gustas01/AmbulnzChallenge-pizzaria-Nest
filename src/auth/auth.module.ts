import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user/user';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'sadnqehyw8hj2487hy¨*T@¨&Noianmds',
    }),
    UsersModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
