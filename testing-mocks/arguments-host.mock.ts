import { httpArgumentsHostMock } from './http-arguments-host.mock';

export const argumentsHostMock = {
  switchToHttp: httpArgumentsHostMock,
  getArgByIndex: jest.fn(),
  getArgs: jest.fn(),
  getType: jest.fn(),
  switchToRpc: jest.fn(),
  switchToWs: jest.fn(),
};
