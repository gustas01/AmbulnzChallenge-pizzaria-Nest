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
    jest.spyOn(pizzasRepositoryMock.useValue, 'findOneBy').mockResolvedValueOnce(null);
    expect(async () => await service.findOne(pizzaMock.name)).rejects.toThrow(
      'Pizza não encontrada',
    );
  });

  it('should create a pizza', async () => {
    expect(await service.create(pizzaMock)).toEqual(pizzaMock);
  });

  it('should update a pizza', async () => {
    expect(await service.update(pizzaMock.id, pizzaMock)).toEqual({
      msg: 'Pizza atualizada com sucesso!',
    });
  });

  it('should update a pizza throw a exception because non-existent pizza', async () => {
    jest.spyOn(pizzasRepositoryMock.useValue, 'findOneBy').mockResolvedValueOnce(null);
    expect(async () => await service.update(pizzaMock.id, pizzaMock)).rejects.toThrow(
      'Pizza não encontrada',
    );
  });

  it('should update a pizza throw a exception because non-existent data in updatePizzaDto', async () => {
    expect(async () => await service.update(pizzaMock.id, {})).rejects.toThrow(
      'Nenhuma informação fornecida para atualização!',
    );
  });

  it('should delete a pizza', async () => {
    expect(await service.delete(pizzaMock.id)).toEqual({ msg: 'Pizza deletada com sucesso!' });
  });

  it('should delete a pizza throw a exception because non-existent pizza', async () => {
    jest.spyOn(pizzasRepositoryMock.useValue, 'findOneBy').mockResolvedValueOnce(null);
    expect(async () => await service.delete(pizzaMock.id)).rejects.toThrow('Pizza não encontrada');
  });
});
