import { Test, TestingModule } from '@nestjs/testing';
import { requestExpressMock } from 'testing-mocks/request-express.mock';
import { userDataMock } from 'testing-mocks/user-data.mock';
import { usersServiceMock } from 'testing-mocks/users.service.mock';
import { User } from './entities/user';
import { UsersController } from './users.controller';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [usersServiceMock],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should findOne user', async () => {
    expect(await controller.findOne(requestExpressMock)).toEqual(userDataMock);
  });

  it('should update user', async () => {
    expect(await controller.update(requestExpressMock, userDataMock)).toEqual(userDataMock);
  });

  it('should update user throw a exception because no-data provided', () => {
    expect(
      async () => await controller.update(requestExpressMock, {} as unknown as User),
    ).rejects.toThrow('Nenhuma informação fornecida para atualização!');
  });

  it('should delete user', async () => {
    expect(await controller.delete(requestExpressMock)).toEqual({
      msg: 'Usuário deletado com sucesso',
    });
  });
});
