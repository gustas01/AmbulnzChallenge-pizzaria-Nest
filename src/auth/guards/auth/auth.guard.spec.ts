import { reflectorMock } from 'testing-mocks/reflector.mock';
import { AuthGuard } from './auth.guard';
import { Reflector } from '@nestjs/core';
import { authServiceMock } from 'testing-mocks/auth.service.mock';
import { Test, TestingModule } from '@nestjs/testing';
import { guardContextMock } from 'testing-mocks/guard.context.mock';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthGuard],
      providers: [authServiceMock, { provide: Reflector, useValue: reflectorMock }],
    }).compile();

    authGuard = module.get<AuthGuard>(AuthGuard);
  });

  it('should be defined', () => {
    expect(authGuard).toBeDefined();
  });

  it('should test public route', () => {
    jest.spyOn(reflectorMock, 'getAllAndOverride').mockReturnValue(undefined);
    expect(authGuard.canActivate(guardContextMock)).toEqual(true);
  });

  it('should test loginRequired(user) route', () => {
    jest.spyOn(reflectorMock, 'getAllAndOverride').mockReturnValue(['user']);
    expect(authGuard.canActivate(guardContextMock)).toEqual(true);
  });

  it('should test route when the user do NOT have permission', () => {
    jest.spyOn(reflectorMock, 'getAllAndOverride').mockReturnValue(['ceo']);
    expect(() => authGuard.canActivate(guardContextMock)).toThrow();
  });
});
