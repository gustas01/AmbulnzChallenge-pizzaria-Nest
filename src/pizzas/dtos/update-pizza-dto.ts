import { IsNumber, IsOptional, IsPositive, MaxLength, MinLength } from 'class-validator';

export class UpdatePizzaDto {
  @IsOptional()
  @MinLength(3)
  @MaxLength(30)
  name: string;

  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsPositive()
  price: number;

  @IsOptional()
  ingredients: string[];
}
