import { IsNotEmpty, IsNumber, IsPositive, MaxLength, MinLength } from 'class-validator';

export class CreatePizzaDto {
  @MinLength(3)
  @MaxLength(30)
  @IsNotEmpty()
  name: string;

  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsNotEmpty()
  @IsPositive()
  price: number;

  @IsNotEmpty()
  ingredients: string[];
}
