import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'src/users/entities/user';
import * as request from 'supertest';
import { userDataMock } from 'testing-mocks/user-data.mock';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a user', async () => {
    const response = await request(app.getHttpServer()).post('/auth/register').send(userDataMock);
    const body = response.body as User;

    expect(body?.username).toEqual(userDataMock.username);
    expect(body?.name).toEqual(userDataMock.name);
    expect(body?.roles).toEqual(userDataMock.roles);
    expect(response.statusCode).toEqual(201);
  });

  it('should signIn', async () => {
    const response = await request(app.getHttpServer()).post('/auth/login').send(userDataMock);

    const setCookieContent: string[] = response.header['set-cookie'];

    token = setCookieContent
      .find((el) => el.startsWith('token='))
      ?.split('=')[1]
      ?.split(';')[0];

    expect(token).toBeDefined();
    expect(typeof token).toEqual('string');
    expect(response.statusCode).toEqual(200);
  });
});
