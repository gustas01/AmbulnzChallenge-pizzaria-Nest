import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { authServiceMock } from '../../testing-mocks/auth.service.mock';
import { Response } from 'express';
import { userDataMock } from '../../testing-mocks/user-data.mock';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [authServiceMock],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should login successfully', async () => {
    const loginSuccess = await controller.signIn(
      { username: userDataMock.username, password: userDataMock.password },
      {
        cookie: jest.fn(),
      } as unknown as Response,
    );

    const loginMessageSuccess = {
      msg: 'Usuário autenticado com sucesso',
    };

    expect(loginSuccess).toEqual(loginMessageSuccess);
  });

  it('should register successfully', async () => {
    const { name, username, password, role } = userDataMock;
    const registerResponse = await controller.register({ name, username, password, role });

    expect(registerResponse).toEqual('Usuário criado com sucesso!');
  });
});
