import { IsOptional, IsStrongPassword, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @MinLength(3)
  name: string;

  @IsOptional()
  @MinLength(5)
  username: string;

  @IsOptional()
  @IsStrongPassword({
    minLength: 5,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;
}
