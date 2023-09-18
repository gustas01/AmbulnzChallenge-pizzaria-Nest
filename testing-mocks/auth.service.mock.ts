import { AuthService } from 'src/auth/auth.service';
import { JwtPayloadMock } from './jwt-payload.mock';
import { tokenMock } from './token.mock';

export const authServiceMock = {
  provide: AuthService,
  useValue: {
    verifyToken: jest.fn().mockReturnValue(JwtPayloadMock),
    signIn: jest.fn().mockResolvedValue({ token: tokenMock }),
    register: jest.fn().mockResolvedValue('Usuário criado com sucesso!'),
  },
};
