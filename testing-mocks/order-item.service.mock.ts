import { OrderItemService } from 'src/order-item/order-item.service';
import { orderItemMock } from './order-item.mock';

export const orderItemServiceMock = {
  provide: OrderItemService,
  useValue: {
    create: jest.fn().mockReturnValue(orderItemMock),
    update: jest.fn().mockReturnValue(orderItemMock),
    delete: jest.fn().mockReturnValue(orderItemMock),
    findAll: jest.fn().mockReturnValue([orderItemMock]),
  },
};
