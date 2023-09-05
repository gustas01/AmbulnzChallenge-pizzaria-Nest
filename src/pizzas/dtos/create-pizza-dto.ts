import { IsNotEmpty, IsNumber, MaxLength, MinLength } from 'class-validator';

export class CreatePizzaDto {
  @MinLength(3)
  @MaxLength(30)
  @IsNotEmpty()
  name: string;

  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  ingredients: string[];
}
