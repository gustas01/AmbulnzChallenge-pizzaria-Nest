import { JwtService } from '@nestjs/jwt';
import { tokenMock } from './token.mock';

export const jwtServiceMock = {
  provide: JwtService,
  useValue: {
    sign: jest.fn().mockResolvedValue(tokenMock),
    verify: jest.fn(),
  },
};
