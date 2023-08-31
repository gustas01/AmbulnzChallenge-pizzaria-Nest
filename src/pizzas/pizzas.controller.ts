import { Controller, Body, Delete, Get, Patch, Post, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pizza } from './entities/pizza/pizza';
import { PizzasService } from './pizzas.service';
import { CreatePizzaDto } from './dtos/create-pizza-dto/create-pizza-dto';

@Controller('pizzas')
export class PizzasController {
  constructor(private pizzaService: PizzasService) {}

  @Get()
  async findAll() {
    return this.pizzaService.findAll();
  }

  @Post()
  async create(@Body() createPizzaDto: CreatePizzaDto){
    return this.pizzaService.create(createPizzaDto);
  }
}
