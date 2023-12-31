import { MinLength, IsStrongPassword } from 'class-validator';

export class SignInDto {
  @MinLength(5)
  username: string;

  @IsStrongPassword({
    minLength: 5,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;
}
