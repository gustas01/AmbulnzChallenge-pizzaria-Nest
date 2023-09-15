import { JwtService } from '@nestjs/jwt';
import { tokenMock } from './token.mock';
import { JwtPayloadMock } from './jwt-payload.mock';

export const jwtServiceMock = {
  provide: JwtService,
  useValue: {
    sign: jest.fn().mockResolvedValue(tokenMock),
    verify: jest
      .fn()
      .mockReturnValueOnce(JwtPayloadMock)
      .mockImplementationOnce(() => {
        throw new Error();
      })
      .mockReturnValue(JwtPayloadMock),
  },
};
