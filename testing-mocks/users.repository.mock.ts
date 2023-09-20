import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user';
import { userDataMock } from './user-data.mock';

export const usersRepositoryMock = {
  provide: getRepositoryToken(User),
  useValue: {
    create: jest.fn().mockReturnValueOnce(userDataMock),
    save: jest.fn().mockResolvedValue(userDataMock),
    findOne: jest.fn().mockResolvedValue(userDataMock),
    update: jest.fn(),
    findOneBy: jest.fn().mockResolvedValue(userDataMock),
  },
};
