import { Role } from '../src/enums/role/role';

export const userDataMock = {
  name: 'fulano',
  username: 'fulanoUsername',
  password_decrypted: '123Aa!',
  password: '$2b$10$Tl6RPNTSKTUw9Un1YJR39eh/iQveWWYbZK.X/zSU4OE.ZvdgrVZv2',
  roles: ['user', 'admin'],
  role: Role.USER,
};
