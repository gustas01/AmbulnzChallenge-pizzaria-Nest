import { Controller, Body, Delete, Get, Patch, Post, Req, UseFilters } from '@nestjs/common';
import { PizzasService } from './pizzas.service';
import { CreatePizzaDto } from './dtos/create-pizza-dto';
import { PizzaQueryFailedErrorFilter } from 'src/filters/pizza-query-failed-error/pizza-query-failed-error.filter';

@Controller('pizzas')
@UseFilters(PizzaQueryFailedErrorFilter)
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
