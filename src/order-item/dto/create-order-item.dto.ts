import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateOrderItemDto {
  @IsNotEmpty()
  pizzaname: string;

  @IsInt()
  @IsPositive()
  quantity: number;
}
