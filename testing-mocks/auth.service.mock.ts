import { AuthService } from 'src/auth/auth.service';
import { JwtPayloadMock } from './jwt-payload.mock';
import { tokenMock } from './token.mock';

export const authServiceMock = {
  provide: AuthService,
  useValue: {
    verifyToken: jest.fn().mockResolvedValue(JwtPayloadMock),
    signIn: jest.fn().mockResolvedValueOnce({ token: tokenMock }),
    register: jest.fn().mockResolvedValue('Usuário criado com sucesso!'),
  },
};
