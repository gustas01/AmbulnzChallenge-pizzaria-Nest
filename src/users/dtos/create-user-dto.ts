import { MinLength, IsStrongPassword, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { Role } from 'src/enums/role/role';

export class CreateUserDto {
  @MinLength(3)
  @IsNotEmpty()
  name: string;

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

  @IsEnum(Role)
  @IsOptional()
  role: Role;
}
