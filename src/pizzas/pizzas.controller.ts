import { Controller, Body, Delete, Get, Patch, Post, Req, UseFilters, Param } from '@nestjs/common';
import { PizzasService } from './pizzas.service';
import { CreatePizzaDto } from './dtos/create-pizza-dto';
import { PizzaQueryFailedErrorFilter } from 'src/filters/pizza-query-failed-error/pizza-query-failed-error.filter';
import { Roles } from 'src/decorators/roles/roles.decorator';
import { Role } from 'src/enums/role/role';
import { UpdatePizzaDto } from './dtos/update-pizza-dto';

@Controller('pizzas')
@UseFilters(PizzaQueryFailedErrorFilter)
export class PizzasController {
  constructor(private pizzaService: PizzasService) {}

  @Get()
  async findAll() {
    return this.pizzaService.findAll();
  }

  // @Roles(Role.MANAGER)
  @Post()
  async create(@Body() createPizzaDto: CreatePizzaDto) {
    return this.pizzaService.create(createPizzaDto);
  }

  // @Roles(Role.MANAGER)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updatePizzaDto: UpdatePizzaDto) {
    return this.pizzaService.update(id, updatePizzaDto);
  }
}
