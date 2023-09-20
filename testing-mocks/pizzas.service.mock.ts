import { PizzasService } from 'src/pizzas/pizzas.service';
import { pizzaMock } from './pizza.mock';

export const pizzasServiceMock = {
  provide: PizzasService,
  useValue: {
    findAll: jest.fn().mockReturnValue([pizzaMock]),
    findOne: jest.fn().mockReturnValue(pizzaMock),
    create: jest.fn().mockReturnValue(pizzaMock),
    update: jest.fn().mockReturnValue(pizzaMock),
    delete: jest.fn().mockReturnValue({
      msg: 'Pizza deletada com sucesso!',
    }),
  },
};
