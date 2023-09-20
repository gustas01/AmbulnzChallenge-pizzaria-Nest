import { getRepositoryToken } from '@nestjs/typeorm';
import { Pizza } from 'src/pizzas/entities/pizza';
import { pizzaMock } from './pizza.mock';

export const pizzasRepositoryMock = {
  provide: getRepositoryToken(Pizza),
  useValue: {
    find: jest.fn().mockResolvedValue([pizzaMock]),
    findOneBy: jest.fn().mockResolvedValue(pizzaMock),
    create: jest.fn().mockReturnValue(pizzaMock),
    save: jest.fn().mockResolvedValue(pizzaMock),
    update: jest.fn(),
    delete: jest.fn(),
  },
};
