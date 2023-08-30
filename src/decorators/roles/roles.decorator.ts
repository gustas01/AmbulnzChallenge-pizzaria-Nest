import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/enums/role/role';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
