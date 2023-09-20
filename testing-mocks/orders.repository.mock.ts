import { getRepositoryToken } from '@nestjs/typeorm';
import { Order } from 'src/orders/entities/order';
import { ordersMock } from './orders.mock';

export const ordersRepositoryMock = {
  provide: getRepositoryToken(Order),
  useValue: {
    create: jest.fn().mockReturnValue(ordersMock),
    findOneBy: jest.fn().mockReturnValue(ordersMock),
    find: jest.fn().mockReturnValue([ordersMock]),
  },
};
