import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config({ path: process.env.ENV === 'test' ? '.env.test' : '.env' });

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  // migrations: [User1694452810409, Order1694465591468, Pizza1694540522004, OrderItem1694540542906],
  migrations: ['typeorm/migrations/*.ts'],
});
