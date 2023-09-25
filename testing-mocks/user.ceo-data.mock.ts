import { Role } from '../src/enums/role/role';

export const userCEODataMock = {
  id: '88e9e782-599c-49a1-b97e-942530af0a2c',
  name: 'fulanoCEO',
  username: 'fulanoCEOUsername',
  password_decrypted: '123Aa!',
  password: '$2b$10$TelIOJC0MQBdMdhr.klHlOoyB2l6jxqQ0Bi0uelzdlEERe.JiwxrK',
  roles: ['user', 'admin', 'manager', 'ceo'],
  role: Role.CEO,
  order: [
    {
      id: '525d381f-20a3-4d99-ac26-a06f3c83eb86',
      paidOff: false,
    },
  ],
};
