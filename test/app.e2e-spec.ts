import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as cookieParser from 'cookie-parser';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/users/entities/user';
import * as request from 'supertest';
import { userDataMock } from 'testing-mocks/user-data.mock';
import { userCEODataMock } from 'testing-mocks/user.ceo-data.mock';
import { AppModule } from '../src/app.module';

describe('App', () => {
  let app: INestApplication;
  let authService: AuthService;
  let tokenUser: string;
  let tokenCEO: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    authService = app.get<AuthService>(AuthService);
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('AuthModule (e2e)', () => {
    it('should create a user', async () => {
      const response = await request(app.getHttpServer()).post('/auth/register').send(userDataMock);
      const body = response.body as User;

      expect(body?.username).toEqual(userDataMock.username);
      expect(body?.name).toEqual(userDataMock.name);
      expect(body?.roles).toEqual(userDataMock.roles);
      expect(response.statusCode).toEqual(201);
    });

    it('should create a user (Role CEO)', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send(userCEODataMock);
      const body = response.body as User;

      expect(body?.username).toEqual(userCEODataMock.username);
      expect(body?.name).toEqual(userCEODataMock.name);
      expect(body?.roles).toEqual(userCEODataMock.roles);
      expect(response.statusCode).toEqual(201);
    });

    it('should signIn as user', async () => {
      const response = await request(app.getHttpServer()).post('/auth/login').send(userDataMock);

      const setCookieContent: string[] = response.header['set-cookie'];

      tokenUser = setCookieContent
        .find((el) => el.startsWith('token='))
        ?.split('=')[1]
        ?.split(';')[0];

      expect(tokenUser).toBeDefined();
      expect(authService.verifyToken(tokenUser)).toBeTruthy();
      expect(typeof tokenUser).toEqual('string');
      expect(response.statusCode).toEqual(200);
    });

    it('should signIn as CEO', async () => {
      const response = await request(app.getHttpServer()).post('/auth/login').send(userCEODataMock);

      const setCookieContent: string[] = response.header['set-cookie'];

      tokenCEO = setCookieContent
        .find((el) => el.startsWith('token='))
        ?.split('=')[1]
        ?.split(';')[0];

      expect(tokenCEO).toBeDefined();
      expect(authService.verifyToken(tokenCEO)).toBeTruthy();
      expect(typeof tokenCEO).toEqual('string');
      expect(response.statusCode).toEqual(200);
    });
  });
});
