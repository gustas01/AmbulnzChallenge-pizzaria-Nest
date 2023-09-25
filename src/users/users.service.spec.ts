import { Test, TestingModule } from '@nestjs/testing';
import { ordersServiceMock } from 'testing-mocks/orders.service.mock';
import { userDataMock } from 'testing-mocks/user-data.mock';
import { usersRepositoryMock } from 'testing-mocks/users.repository.mock';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, usersRepositoryMock, ordersServiceMock],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    expect(await service.create(userDataMock)).toEqual(userDataMock);
  });

  it('should findOne user', async () => {
    expect(await service.findOne(userDataMock.name)).toEqual(userDataMock);
  });

  it('should throw a exception while calling findOne user', () => {
    jest.spyOn(usersRepositoryMock.useValue, 'findOne').mockResolvedValue(null);
    expect(async () => await service.findOne(userDataMock.name)).rejects.toThrow(
      'Usuário não encontrado!',
    );
  });

  it('should update user', async () => {
    expect(await service.update(userDataMock.id, userDataMock)).toEqual(userDataMock);
  });

  it('should generate the array of roles', () => {
    expect(service.roleToRoles(userDataMock.role)).toEqual(['user']);
  });
});
