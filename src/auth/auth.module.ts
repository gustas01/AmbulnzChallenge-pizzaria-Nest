import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: process.env.ENV === 'test' ? '.env.test' : '.env' }),
    JwtModule.register({
      global: true,
      secret: String(process.env.JWT_SECRET_KEY),
    }),
    UsersModule,
  ],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
