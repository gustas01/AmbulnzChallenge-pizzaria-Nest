import { OrdersService } from 'src/orders/orders.service';

export const ordersServiceMock = {
  provide: OrdersService,
  useValue: {
    create: jest.fn(),
    findOne: jest.fn(),
    findAll: jest.fn(),
  },
};
