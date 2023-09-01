import { IsDecimal, IsNotEmpty, MinLength } from 'class-validator';

export class CreatePizzaDto {
  @MinLength(3)
  @IsNotEmpty()
  name: string;

  @IsDecimal()
  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  ingredients: string;
}
