import { Test, TestingModule } from '@nestjs/testing';
import { orderItemMock } from 'testing-mocks/order-item.mock';
import { orderItemServiceMock } from 'testing-mocks/order-item.service.mock';
import { requestExpressMock } from 'testing-mocks/request-express.mock';
import { OrderItemController } from './order-item.controller';

describe('OrderItemController', () => {
  let controller: OrderItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderItemController],
      providers: [orderItemServiceMock],
    }).compile();

    controller = module.get<OrderItemController>(OrderItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all order-itens', async () => {
    expect(await controller.findAll(requestExpressMock)).toEqual([orderItemMock]);
  });

  it('should create an order-item', async () => {
    expect(
      await controller.create(requestExpressMock, {
        pizzaname: orderItemMock.pizza.name,
        quantity: orderItemMock.quantity,
      }),
    ).toEqual(orderItemMock);
  });

  it('should update an order-item', async () => {
    expect(await controller.update(orderItemMock.id, orderItemMock)).toEqual(orderItemMock);
  });

  it('should delete an order-item', async () => {
    expect(await controller.delete(orderItemMock.id)).toEqual(orderItemMock);
  });
});
