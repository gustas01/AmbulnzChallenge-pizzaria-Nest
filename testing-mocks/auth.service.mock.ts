import { AuthService } from 'src/auth/auth.service';
import { JwtPayloadMock } from './jwt-payload.mock';
import { TokenMock } from './token.mock';

export const AuthServiceMock = {
  provide: AuthService,
  useValue: {
    verifyToken: jest.fn().mockResolvedValue(JwtPayloadMock),
    signIn: jest.fn().mockResolvedValueOnce({ token: TokenMock }),
    register: jest.fn().mockResolvedValue('Usuário criado com sucesso!'),
  },
};
