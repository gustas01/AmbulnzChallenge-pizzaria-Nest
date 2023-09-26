import { getRepositoryToken } from '@nestjs/typeorm';
import { OrderItem } from 'src/order-item/entities/order-item.entity';
import { orderItemMock } from './order-item.mock';

export const orderItemRepositoryMock = {
  provide: getRepositoryToken(OrderItem),
  useValue: {
    create: jest.fn().mockReturnValue(orderItemMock),
    save: jest.fn().mockResolvedValue(orderItemMock),
    find: jest.fn().mockResolvedValue([orderItemMock]),
    update: jest.fn().mockResolvedValue(orderItemMock),
    delete: jest.fn(),
    findOneBy: jest.fn().mockResolvedValue(orderItemMock),
  },
};
