import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as cookieParser from 'cookie-parser';
import { AuthService } from 'src/auth/auth.service';
import { OrderItem } from 'src/order-item/entities/order-item.entity';
import { OrdersService } from 'src/orders/orders.service';
import { Pizza } from 'src/pizzas/entities/pizza';
import { User } from 'src/users/entities/user';
import { UsersService } from 'src/users/users.service';
import * as request from 'supertest';
import { ExceptionTypeMock } from 'testing-mocks/exception-type.mock';
import { orderItemMock } from 'testing-mocks/order-item.mock';
import { pizzaMock } from 'testing-mocks/pizza.mock';
import { userDataMock } from 'testing-mocks/user-data.mock';
import { userCEODataMock } from 'testing-mocks/user.ceo-data.mock';
import { AppModule } from '../src/app.module';

describe('App', () => {
  let app: INestApplication;
  let authService: AuthService;
  let usersService: UsersService;
  let ordersService: OrdersService;
  let tokenUser: string;
  let tokenCEO: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    authService = app.get<AuthService>(AuthService);
    usersService = app.get<UsersService>(UsersService);
    ordersService = app.get<OrdersService>(OrdersService);
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

  describe('PizzasModule (e2e)', () => {
    it('should try to CREATE a Pizza and fail due to insufficient permissions', async () => {
      const response = await request(app.getHttpServer())
        .post('/pizzas')
        .send(pizzaMock)
        .set('Cookie', `token=${tokenUser}`);
      const body: ExceptionTypeMock = response.body;

      expect(response.statusCode).toEqual(403);
      expect(body.message).toEqual('Usuário sem previlégios de acesso');
      expect(body.error).toEqual('Forbidden');
      expect(body.statusCode).toEqual(403);
    });

    it('should CREATE a Pizza', async () => {
      const response = await request(app.getHttpServer())
        .post('/pizzas')
        .send(pizzaMock)
        .set('Cookie', `token=${tokenCEO}`);
      const body: Pizza = response.body;

      expect(response.statusCode).toEqual(201);
      expect(body.id).toEqual(pizzaMock.id);
      expect(body.ingredients).toEqual(pizzaMock.ingredients);
      expect(body.name).toEqual(pizzaMock.name);
      expect(body.price).toEqual(pizzaMock.price);
    });

    it('should findAll Pizzas', async () => {
      const response = await request(app.getHttpServer()).get('/pizzas');

      const body: Pizza[] = response.body;

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.statusCode).toEqual(200);
      expect(body).toContainEqual(pizzaMock);
    });

    it('should findOne Pizzas', async () => {
      const response = await request(app.getHttpServer()).get(`/pizzas/${pizzaMock.name}`);

      const body: Pizza = response.body;

      expect(response.statusCode).toEqual(200);
      expect(body).toEqual(pizzaMock);
    });

    it('should try to UPDATE a Pizza and fail due to insufficient permissions', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/pizzas/${pizzaMock.id}`)
        .send({ price: 5 })
        .set('Cookie', `token=${tokenUser}`);
      const body: ExceptionTypeMock = response.body;

      expect(response.statusCode).toEqual(403);
      expect(body.message).toEqual('Usuário sem previlégios de acesso');
      expect(body.error).toEqual('Forbidden');
      expect(body.statusCode).toEqual(403);
    });

    it('should UPDATE a Pizza', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/pizzas/${pizzaMock.id}`)
        .send({ price: 5 })
        .set('Cookie', `token=${tokenCEO}`);

      const newPizza = await request(app.getHttpServer())
        .get(`/pizzas/${pizzaMock.name}`)
        .set('Cookie', `token=${tokenCEO}`);

      const body: Pizza = newPizza.body;

      expect(response.statusCode).toEqual(200);
      expect(body.id).toEqual(pizzaMock.id);
      expect(body.ingredients).toEqual(pizzaMock.ingredients);
      expect(body.name).toEqual(pizzaMock.name);
      expect(body.price).toEqual(5);
    });

    it('should try to DELETE a Pizza and fail due to insufficient permissions', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/pizzas/${pizzaMock.id}`)
        .set('Cookie', `token=${tokenUser}`);
      const body: ExceptionTypeMock = response.body;

      expect(response.statusCode).toEqual(403);
      expect(body.message).toEqual('Usuário sem previlégios de acesso');
      expect(body.error).toEqual('Forbidden');
      expect(body.statusCode).toEqual(403);
    });

    it('should DELETE a Pizza', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/pizzas/${pizzaMock.id}`)
        .set('Cookie', `token=${tokenCEO}`);
      const body = response.body;

      expect(response.statusCode).toEqual(200);
      expect(body.msg).toEqual('Pizza deletada com sucesso!');
    });
  });

  describe('UsersModule (e2e)', () => {
    it('should findOne User', async () => {
      const response = await request(app.getHttpServer())
        .get('/users')
        .set('Cookie', `token=${tokenUser}`);

      const body: User = response.body;

      expect(response.statusCode).toEqual(200);
      expect(body.name).toEqual(userDataMock.name);
      expect(body.roles).toEqual(userDataMock.roles);
      expect(body.username).toEqual(userDataMock.username);
    });

    it('should UPDATE User', async () => {
      const response = await request(app.getHttpServer())
        .patch('/users')
        .set('Cookie', `token=${tokenUser}`)
        .send({ name: `${userDataMock.name} EDITADO` });

      const body: User = response.body;

      expect(response.statusCode).toEqual(200);
      expect(body.name).toEqual(`${userDataMock.name} EDITADO`);
      expect(body.roles).toEqual(userDataMock.roles);
      expect(body.username).toEqual(userDataMock.username);

      await request(app.getHttpServer())
        .patch('/users')
        .set('Cookie', `token=${tokenUser}`)
        .send({ name: userDataMock.name });
    });
  });

  describe('OrdersModule (e2e)', () => {
    it('should findAll orders', async () => {
      const response = await request(app.getHttpServer())
        .get('/orders')
        .set('Cookie', `token=${tokenUser}`);

      expect(response.statusCode).toEqual(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toBeTruthy();
    });
  });

  describe('OrderItemModule (e2e)', () => {
    it('should try to create a Order-Item and fail due to Pizza not found', async () => {
      const response = await request(app.getHttpServer())
        .post('/order-item')
        .set('Cookie', `token=${tokenUser}`)
        .send({ pizzaname: orderItemMock.pizza.name, quantity: orderItemMock.quantity });

      const body: ExceptionTypeMock = response.body;

      expect(response.statusCode).toEqual(404);
      expect(body.message).toEqual('Pizza não encontrada');
      expect(body.error).toEqual('Not Found');
      expect(body.statusCode).toEqual(404);
    });

    it('should create a Order-Item', async () => {
      const newPizza = await request(app.getHttpServer())
        .post('/pizzas')
        .send(pizzaMock)
        .set('Cookie', `token=${tokenCEO}`);

      const response = await request(app.getHttpServer())
        .post('/order-item')
        .set('Cookie', `token=${tokenUser}`)
        .send({ pizzaname: orderItemMock.pizza.name, quantity: orderItemMock.quantity });

      const body: OrderItem = response.body;

      delete newPizza.body.id;

      const user = await usersService.findOne(userDataMock.username);
      const order = await ordersService.findOne(user);

      expect(response.statusCode).toEqual(201);
      expect(body.pizza).toEqual(newPizza.body);
      expect(body.order.id).toEqual(order.id);
      expect(body.quantity).toEqual(orderItemMock.quantity);
    });

    it('should findAll orderItens', async () => {
      const response = await request(app.getHttpServer())
        .get('/order-item')
        .set('Cookie', `token=${tokenUser}`);

      expect(response.statusCode).toEqual(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toBeTruthy();
    });

    it('should UPDATE orderItem', async () => {
      const orderItem = await request(app.getHttpServer())
        .post('/order-item')
        .set('Cookie', `token=${tokenUser}`)
        .send({ pizzaname: orderItemMock.pizza.name, quantity: orderItemMock.quantity });

      const response = await request(app.getHttpServer())
        .patch(`/order-item/${orderItem.body.id}`)
        .set('Cookie', `token=${tokenUser}`)
        .send({ quantity: 5 });

      const AllOrderItens = await request(app.getHttpServer())
        .get('/order-item')
        .set('Cookie', `token=${tokenUser}`);

      const bodyAllOrderItens: OrderItem[] = AllOrderItens.body;
      const updatedOrderItem = bodyAllOrderItens.filter((el) => el.id === orderItem.body.id);
      console.log(updatedOrderItem[0].id);

      expect(updatedOrderItem[0].quantity).toEqual(5);
      expect(response.body.msg).toEqual('Ordem atualizada com sucesso!');
    });
  });
});
