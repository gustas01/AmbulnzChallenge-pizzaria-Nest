import { OrdersService } from 'src/orders/orders.service';
import { ordersMock } from './orders.mock';

export const ordersServiceMock = {
  provide: OrdersService,
  useValue: {
    create: jest.fn().mockResolvedValue(ordersMock),
    findOne: jest.fn(),
    findAll: jest.fn(),
  },
};
