import { IsDecimal, IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';

export class UpdatePizzaDto {
  @IsOptional()
  @MinLength(3)
  @MaxLength(30)
  name: string;

  @IsOptional()
  @IsDecimal()
  @IsNotEmpty()
  price: number;

  @IsOptional()
  @IsNotEmpty()
  ingredients: string;
}
