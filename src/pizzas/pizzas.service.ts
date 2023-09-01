import { Injectable } from '@nestjs/common';
import { Pizza } from './entities/pizza/pizza';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePizzaDto } from './dtos/create-pizza-dto';
import { UpdatePizzaDto } from './dtos/update-pizza-dto';

@Injectable()
export class PizzasService {
  constructor(@InjectRepository(Pizza) private pizzaRepository: Repository<Pizza>) {}

  async findAll() {
    return this.pizzaRepository.find({ select: { name: true, ingredients: true, price: true } });
  }

  async findOne(pizzaname: string) {}

  async create(createPizzaDto: CreatePizzaDto) {
    let newPizza: Pizza = this.pizzaRepository.create(createPizzaDto);
    newPizza.ingredients = JSON.stringify(newPizza.ingredients);
    newPizza = await this.pizzaRepository.save(newPizza);
    return newPizza;
  }

  async update(id: number, updatePizzaDto: Partial<UpdatePizzaDto>) {
    await this.pizzaRepository.update(id, updatePizzaDto);
    return this.pizzaRepository.findOneBy({ id });
  }

  async delete() {}
}
