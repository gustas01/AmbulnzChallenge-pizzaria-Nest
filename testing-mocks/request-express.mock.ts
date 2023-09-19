import { Request as Req } from 'express';
import { userDataMock } from './user-data.mock';

export const requestExpressMock = {
  user: userDataMock,
} as unknown as Req;
