import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePizzaDto } from './dtos/create-pizza-dto';
import { UpdatePizzaDto } from './dtos/update-pizza-dto';
import { Pizza } from './entities/pizza';

@Injectable()
export class PizzasService {
  constructor(@InjectRepository(Pizza) private pizzaRepository: Repository<Pizza>) {}

  async findAll() {
    return this.pizzaRepository.find({
      select: { name: true, ingredients: true, price: true, id: true },
    });
  }

  async findOne(pizzaname: string) {
    const pizza: Pizza = await this.pizzaRepository.findOneBy({ name: pizzaname });

    if (!pizza) throw new NotFoundException('Pizza não encontrada');

    return pizza;
  }

  async create(createPizzaDto: CreatePizzaDto) {
    createPizzaDto.ingredients = createPizzaDto.ingredients.map((el) => el.trim());

    let newPizza: Pizza = this.pizzaRepository.create(createPizzaDto);
    newPizza = await this.pizzaRepository.save(newPizza);
    return newPizza;
  }

  async update(id: number, updatePizzaDto: Partial<UpdatePizzaDto>) {
    if (!Object.keys(updatePizzaDto).length)
      throw new BadRequestException('Nenhuma informação fornecida para atualização!');

    const pizza = await this.pizzaRepository.findOneBy({ id });

    if (!pizza) throw new NotFoundException('Pizza não encontrada');

    await this.pizzaRepository.update(id, updatePizzaDto);

    return { msg: 'Pizza atualizada com sucesso!' };
  }

  async delete(id: number) {
    await this.pizzaRepository.delete(id);
    return { msg: 'Pizza deletada com sucesso!' };
  }
}
