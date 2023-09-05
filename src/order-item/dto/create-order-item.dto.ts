import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateOrderItemDto {
  @IsNotEmpty()
  pizzaname: string;

  @IsNotEmpty()
  @IsInt()
  quantity: number;
}
