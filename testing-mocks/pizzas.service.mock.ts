import { PizzasService } from 'src/pizzas/pizzas.service';
import { pizzaMock } from './pizza.mock';

export const pizzasServiceMock = {
  provide: PizzasService,
  useValue: {
    findAll: jest.fn().mockResolvedValue([pizzaMock]),
    findOne: jest.fn().mockResolvedValue(pizzaMock),
    create: jest.fn().mockResolvedValue(pizzaMock),
    update: jest.fn().mockResolvedValue(pizzaMock),
    delete: jest.fn().mockResolvedValue({
      msg: 'Pizza deletada com sucesso!',
    }),
  },
};
