import { UsersService } from 'src/users/users.service';
import { userDataMock } from './user-data.mock';

export const usersServiceMock = {
  provide: UsersService,
  useValue: {
    findOne: jest
      .fn()
      .mockResolvedValueOnce(userDataMock)
      .mockResolvedValueOnce(userDataMock)
      .mockResolvedValue(null),
    create: jest.fn().mockResolvedValue(userDataMock),
  },
};
