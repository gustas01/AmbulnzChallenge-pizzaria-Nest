import { tokenMock } from './token.mock';

export const guardContextMock = {
  getClass: jest.fn(),
  getHandler: jest.fn(),
  getArgs: jest.fn(),
  getArgByIndex: jest.fn(),
  switchToRpc: jest.fn(),
  switchToHttp: jest
    .fn()
    .mockReturnValue({ getRequest: () => ({ cookies: { token: tokenMock } }) }),
  switchToWs: jest.fn(),
  getType: jest.fn(),
};
