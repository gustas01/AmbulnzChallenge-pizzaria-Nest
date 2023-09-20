import { Test, TestingModule } from '@nestjs/testing';

import { pizzaMock } from 'testing-mocks/pizza.mock';
import { pizzasRepositoryMock } from 'testing-mocks/pizzas.repository.mock';
import { PizzasService } from './pizzas.service';

describe('PizzasService', () => {
  let service: PizzasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PizzasService, pizzasRepositoryMock],
    }).compile();

    service = module.get<PizzasService>(PizzasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should findAll pizzas', async () => {
    expect(await service.findAll()).toEqual([pizzaMock]);
  });

  it('should findOne pizza', async () => {
    expect(await service.findOne(pizzaMock.name)).toEqual(pizzaMock);
  });

  it('should findOne throw a exception because non-existent pizza', () => {
    jest.spyOn(pizzasRepositoryMock.useValue, 'findOneBy').mockReturnValueOnce(undefined);
    expect(async () => await service.findOne(pizzaMock.name)).rejects.toThrow(
      'Pizza não encontrada',
    );
  });

  it('should create a pizza', async () => {
    expect(await service.create(pizzaMock)).toEqual(pizzaMock);
  });

  it('should update a pizza', async () => {
    expect(await service.update(pizzaMock.id, pizzaMock)).toEqual(pizzaMock);
  });

  it('should delete a pizza', async () => {
    expect(await service.delete(pizzaMock.id)).toEqual({ msg: 'Pizza deletada com sucesso!' });
  });
});
