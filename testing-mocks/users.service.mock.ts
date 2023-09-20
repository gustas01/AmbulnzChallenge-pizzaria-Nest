import { UsersService } from 'src/users/users.service';
import { userDataMock } from './user-data.mock';

export const usersServiceMock = {
  provide: UsersService,
  useValue: {
    findOne: jest.fn().mockResolvedValue(userDataMock),
    create: jest.fn().mockResolvedValue(userDataMock),
    update: jest.fn().mockResolvedValue(userDataMock),
    delete: jest.fn(),
  },
};
