import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateOrderItemDto {
  @IsNotEmpty()
  pizzaname: string;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  quantity: number;
}
