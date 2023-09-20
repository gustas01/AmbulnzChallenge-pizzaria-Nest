import { Test, TestingModule } from '@nestjs/testing';

import { pizzaMock } from 'testing-mocks/pizza.mock';
import { pizzasServiceMock } from 'testing-mocks/pizzas.service.mock';
import { PizzasController } from './pizzas.controller';

describe('PizzasController', () => {
  let controller: PizzasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PizzasController],
      providers: [pizzasServiceMock],
    }).compile();

    controller = module.get<PizzasController>(PizzasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all pizzas', async () => {
    expect(await controller.findAll()).toEqual([pizzaMock]);
  });

  it('should return one pizza by name', async () => {
    expect(await controller.findOne(pizzaMock.name)).toEqual(pizzaMock);
  });

  it('should create a pizza', async () => {
    expect(await controller.create(pizzaMock)).toEqual(pizzaMock);
  });

  it('should update a pizza', async () => {
    expect(await controller.update(pizzaMock.id, pizzaMock)).toEqual(pizzaMock);
  });

  it('should delete a pizza', async () => {
    expect(await controller.delete(pizzaMock.id)).toEqual({
      msg: 'Pizza deletada com sucesso!',
    });
  });
});
