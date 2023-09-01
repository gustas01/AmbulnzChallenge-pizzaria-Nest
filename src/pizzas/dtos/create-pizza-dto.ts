import { IsDecimal, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreatePizzaDto {
  @MinLength(3)
  @MaxLength(30)
  @IsNotEmpty()
  name: string;

  @IsDecimal()
  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  ingredients: string;
}
