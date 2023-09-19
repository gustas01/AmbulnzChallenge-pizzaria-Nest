import { PizzasService } from 'src/pizzas/pizzas.service';
import { pizzaMock } from './pizza.mock';

export const pizzasServiceMock = {
  provide: PizzasService,
  useValue: {
    findAll: jest.fn(),
    findOne: jest.fn().mockReturnValue(pizzaMock),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};
