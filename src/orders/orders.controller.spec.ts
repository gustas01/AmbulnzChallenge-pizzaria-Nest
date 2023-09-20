import { Test, TestingModule } from '@nestjs/testing';
import { ordersMock } from 'testing-mocks/orders.mock';
import { ordersServiceMock } from 'testing-mocks/orders.service.mock';
import { requestExpressMock } from 'testing-mocks/request-express.mock';
import { OrdersController } from './orders.controller';

describe('OrdersController', () => {
  let controller: OrdersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [ordersServiceMock],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all orders from the user logged in', async () => {
    jest.spyOn(ordersServiceMock.useValue, 'findAll').mockReturnValue([ordersMock]);
    expect(await controller.findAll(requestExpressMock)).toEqual([ordersMock]);
  });
});
