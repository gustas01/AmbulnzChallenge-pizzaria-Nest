import { Injectable } from '@nestjs/common';
import { Pizza } from './entities/pizza';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePizzaDto } from './dtos/create-pizza-dto';
import { UpdatePizzaDto } from './dtos/update-pizza-dto';

@Injectable()
export class PizzasService {
  constructor(@InjectRepository(Pizza) private pizzaRepository: Repository<Pizza>) {}

  async findAll() {
    const pizzas: Pizza[] = await this.pizzaRepository.find({
      select: { name: true, ingredients: true, price: true },
    });

    return pizzas.map((el) => {
      const ingredients: string[] = JSON.parse(el.ingredients);
      return { ...el, ingredients };
    });
  }

  async findOne(pizzaname: string) {
    const pizza: Pizza = await this.pizzaRepository.findOneBy({ name: pizzaname });
    pizza.ingredients = JSON.parse(pizza.ingredients);
    return pizza;
  }

  async create(createPizzaDto: CreatePizzaDto) {
    createPizzaDto.ingredients = JSON.stringify(
      createPizzaDto.ingredients.split(',').map((el) => el.trim()),
    );

    let newPizza: Pizza = this.pizzaRepository.create(createPizzaDto);
    newPizza = await this.pizzaRepository.save(newPizza);
    return newPizza;
  }

  async update(id: number, updatePizzaDto: Partial<UpdatePizzaDto>) {
    await this.pizzaRepository.update(id, updatePizzaDto);
    return this.pizzaRepository.findOneBy({ id });
  }

  async delete(id: number) {
    return this.pizzaRepository.delete(id);
  }
}
