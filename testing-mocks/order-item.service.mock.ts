import { OrderItemService } from 'src/order-item/order-item.service';
import { orderItemMock } from './order-item.mock';

export const orderItemServiceMock = {
  provide: OrderItemService,
  useValue: {
    create: jest.fn().mockResolvedValue(orderItemMock),
    update: jest.fn().mockResolvedValue(orderItemMock),
    delete: jest.fn().mockResolvedValue(orderItemMock),
    findAll: jest.fn().mockResolvedValue([orderItemMock]),
  },
};
