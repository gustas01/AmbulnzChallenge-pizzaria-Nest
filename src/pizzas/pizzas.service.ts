import { Injectable } from '@nestjs/common';
import { Pizza } from './entities/pizza/pizza';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePizzaDto } from './dtos/create-pizza-dto';

@Injectable()
export class PizzasService {
  constructor(@InjectRepository(Pizza) private pizzaRepository: Repository<Pizza>) {}

  async findAll() {
    return this.pizzaRepository.find();
  }

  async findOne(pizzaname: string) {}

  async create(createPizzaDto: CreatePizzaDto) {
    let newPizza: Pizza = this.pizzaRepository.create(createPizzaDto);
    newPizza.ingredients = JSON.stringify(newPizza.ingredients);
    newPizza = await this.pizzaRepository.save(newPizza);
    return newPizza;
  }

  async update() {}
  async delete() {}
}
