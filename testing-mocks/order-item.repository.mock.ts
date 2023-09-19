import { getRepositoryToken } from '@nestjs/typeorm';
import { OrderItem } from 'src/order-item/entities/order-item.entity';
import { orderItemMock } from './order-item.mock';

export const orderItemRepositoryMock = {
  provide: getRepositoryToken(OrderItem),
  useValue: {
    create: jest.fn().mockReturnValue(orderItemMock),
    save: jest.fn().mockReturnValue(orderItemMock),
    find: jest.fn().mockReturnValue([orderItemMock]),
    update: jest.fn().mockReturnValue(orderItemMock),
    delete: jest.fn(),
  },
};
