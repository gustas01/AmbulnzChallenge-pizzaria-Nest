import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user';
import { orderItemMock } from 'testing-mocks/order-item.mock';
import { orderItemRepositoryMock } from 'testing-mocks/order-item.repository.mock';
import { ordersServiceMock } from 'testing-mocks/orders.service.mock';
import { pizzasServiceMock } from 'testing-mocks/pizzas.service.mock';
import { userDataMock } from 'testing-mocks/user-data.mock';
import { Repository } from 'typeorm';
import { OrderItem } from './entities/order-item.entity';
import { OrderItemService } from './order-item.service';

describe('OrderItemService', () => {
  let service: OrderItemService;
  let orderItemRepository: Repository<OrderItem>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderItemService, orderItemRepositoryMock, pizzasServiceMock, ordersServiceMock],
    }).compile();

    service = module.get<OrderItemService>(OrderItemService);
    orderItemRepository = module.get(getRepositoryToken(OrderItem));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(orderItemRepository).toBeDefined();
  });

  it('should create an order-item', async () => {
    const orderItem = await service.create(userDataMock as unknown as User, {
      pizzaname: orderItemMock.pizza.name,
      quantity: orderItemMock.quantity,
    });

    expect(orderItem).toEqual(orderItemMock);
  });

  it('should return all orderItem from the user logged in', async () => {
    const orderItems = await service.findAll(userDataMock as unknown as User);

    expect(orderItems).toEqual([orderItemMock]);
  });

  it('should update an orderItem', async () => {
    expect(await service.update(orderItemMock.id, orderItemMock)).toEqual({
      msg: 'Ordem atualizada com sucesso!',
    });
  });

  it('should update an orderItem throw a exception because non-existent data in updateOrderItemDto', async () => {
    expect(async () => await service.update(orderItemMock.id, {})).rejects.toThrow(
      'Nenhuma informação fornecida para atualização!',
    );
  });

  it('should update an orderItem throw a exception because non-existent pizza', async () => {
    jest.spyOn(pizzasServiceMock.useValue, 'findOne').mockResolvedValueOnce(null);
    expect(
      async () =>
        await service.update(orderItemMock.id, {
          pizzaname: orderItemMock.pizza.name,
          ...orderItemMock,
        }),
    ).rejects.toThrow('Pizza não encontrada');
  });

  it('should update orderItem throw a exception because non-existent orderItem', async () => {
    jest.spyOn(orderItemRepositoryMock.useValue, 'findOneBy').mockResolvedValueOnce(null);
    expect(async () => await service.update(orderItemMock.id, orderItemMock)).rejects.toThrow(
      'ID inválido',
    );
  });

  it('should delete a orderItem', async () => {
    expect(await service.delete(orderItemMock.id)).toEqual({ msg: 'Item apagado!' });
  });

  it('should delete a orderItem throw a exception because non-existent orderItem', async () => {
    jest.spyOn(orderItemRepositoryMock.useValue, 'findOneBy').mockResolvedValueOnce(null);
    expect(async () => await service.delete(orderItemMock.id)).rejects.toThrow('ID inválido');
  });
});
