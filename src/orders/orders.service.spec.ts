import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'src/users/entities/user';
import { ordersMock } from 'testing-mocks/orders.mock';
import { ordersRepositoryMock } from 'testing-mocks/orders.repository.mock';
import { userDataMock } from 'testing-mocks/user-data.mock';
import { OrdersService } from './orders.service';

describe('OrdersService', () => {
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersService, ordersRepositoryMock],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('shold create a order', async () => {
    expect(await service.create()).toEqual(ordersMock);
  });

  it('shold findOne order', async () => {
    expect(await service.findOne(userDataMock as unknown as User)).toEqual(ordersMock);
  });

  it('shold findAll orders', async () => {
    expect(await service.findAll(userDataMock as unknown as User)).toEqual([ordersMock]);
  });
});
