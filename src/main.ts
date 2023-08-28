import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { QueryFailedErrorFilter } from './filters/query-failed-error/query-failed-error.filter';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new QueryFailedErrorFilter());
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
