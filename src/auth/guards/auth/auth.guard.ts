import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { Role } from 'src/enums/role/role';
import { User } from 'src/users/entities/user';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    //caso a rota seja pública
    if (!requiredRoles) return true;

    const request: Request = context.switchToHttp().getRequest();
    const { token } = request.cookies;

    //caso a rota apenas exija que o usuário esteja logado, ou seja, tenha um token válido
    const payload: User = this.authService.verifyToken(token);
    request['user'] = payload;

    //caso a rota exija uma role de maior nível
    if (!payload.roles?.some((role) => requiredRoles.includes(role)))
      throw new ForbiddenException('Usuário sem previlégios de acesso');

    return true;
  }
}
