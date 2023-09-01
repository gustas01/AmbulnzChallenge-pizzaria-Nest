import { IsDecimal, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class UpdatePizzaDto {
  @IsOptional()
  @MinLength(3)
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsDecimal()
  @IsNotEmpty()
  price: number;
}
