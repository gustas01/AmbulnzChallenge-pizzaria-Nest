import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { jwtServiceMock } from '../../testing-mocks/jwt.service.mock';
import { usersServiceMock } from '../../testing-mocks/users.service.mock';
import { userDataMock } from '../../testing-mocks/user-data.mock';
import { User } from '../users/entities/user';
import { tokenMock } from '../../testing-mocks/token.mock';
import { JwtPayloadMock } from '../../testing-mocks/jwt-payload.mock';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, jwtServiceMock, usersServiceMock],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should verify token', () => {
    const payloadToken = service.verifyToken(tokenMock);
    expect(payloadToken).toEqual(JwtPayloadMock);
  });

  it('should throw an exception while verifying token', () => {
    expect(() => service.verifyToken(tokenMock)).toThrow('Usuário inválido');
  });

  it('should register a user', async () => {
    const user: User = await service.register(userDataMock);
    expect(user).toEqual(userDataMock);
  });

  it('should signIn successfully', async () => {
    const { username, password_decrypted } = userDataMock;
    const tokenPayload: User = service.verifyToken(
      await service.signIn({ username, password: password_decrypted }),
    );

    expect(tokenPayload.name).toEqual(userDataMock.name);
    expect(tokenPayload.username).toEqual(userDataMock.username);
    expect(tokenPayload.roles).toEqual(userDataMock.roles);
  });

  it('should signIn throw an exception for wrong password', async () => {
    const { username } = userDataMock;
    expect(
      async () => await service.signIn({ username, password: 'wrongPassword' }),
    ).rejects.toThrow('Usuário ou senha inválidos!');
  });

  it('should signIn throw an exception for non-existent user', async () => {
    const { username, password_decrypted } = userDataMock;
    expect(
      async () => await service.signIn({ username, password: password_decrypted }),
    ).rejects.toThrow('Usuário ou senha inválidos!');
  });
});
