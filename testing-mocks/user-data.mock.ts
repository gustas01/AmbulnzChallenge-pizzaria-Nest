import { Role } from '../src/enums/role/role';

export const userDataMock = {
  id: '57684e7b-3143-4548-9e8e-3753c721386a',
  name: 'fulano',
  username: 'fulanoUsername',
  password_decrypted: '123Aa!',
  password: '$2b$10$Tl6RPNTSKTUw9Un1YJR39eh/iQveWWYbZK.X/zSU4OE.ZvdgrVZv2',
  roles: ['user'],
  role: Role.USER,
  order: [
    {
      id: '215a67fb-19b0-4f4d-8ca9-447a90cf89ba',
      paidOff: false,
    },
  ],
};
