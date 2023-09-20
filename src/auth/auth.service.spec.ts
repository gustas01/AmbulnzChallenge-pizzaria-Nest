import { Test, TestingModule } from '@nestjs/testing';
import { JwtPayloadMock } from '../../testing-mocks/jwt-payload.mock';
import { jwtServiceMock } from '../../testing-mocks/jwt.service.mock';
import { tokenMock } from '../../testing-mocks/token.mock';
import { userDataMock } from '../../testing-mocks/user-data.mock';
import { usersServiceMock } from '../../testing-mocks/users.service.mock';
import { User } from '../users/entities/user';
import { AuthService } from './auth.service';

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
    jest.spyOn(jwtServiceMock.useValue, 'verify').mockReturnValue(JwtPayloadMock);
    const payloadToken = service.verifyToken(tokenMock);
    expect(payloadToken).toEqual(JwtPayloadMock);
  });

  it('should throw an exception while verifying token', () => {
    jest.spyOn(jwtServiceMock.useValue, 'verify').mockImplementationOnce(() => {
      throw new Error();
    });
    expect(() => service.verifyToken(tokenMock)).toThrow('Usuário inválido');
  });

  it('should register a user', async () => {
    const user: User = await service.register(userDataMock);
    expect(user).toEqual(userDataMock);
  });

  it('should signIn successfully', async () => {
    jest.spyOn(jwtServiceMock.useValue, 'verify').mockReturnValue(JwtPayloadMock);
    const { username, password_decrypted } = userDataMock;
    const tokenPayload: User = service.verifyToken(
      await service.signIn({ username, password: password_decrypted }),
    );

    expect(tokenPayload.name).toEqual(userDataMock.name);
    expect(tokenPayload.username).toEqual(userDataMock.username);
    expect(tokenPayload.roles).toEqual(userDataMock.roles);
  });

  it('should signIn throw an exception because wrong password', async () => {
    const { username } = userDataMock;
    expect(
      async () => await service.signIn({ username, password: 'wrongPassword' }),
    ).rejects.toThrow('Usuário ou senha inválidos!');
  });

  it('should signIn throw an exception because non-existent user', async () => {
    jest.spyOn(usersServiceMock.useValue, 'findOne').mockResolvedValueOnce(null);
    const { username, password_decrypted } = userDataMock;
    expect(
      async () => await service.signIn({ username, password: password_decrypted }),
    ).rejects.toThrow('Usuário ou senha inválidos!');
  });
});
