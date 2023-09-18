import { userDataMock } from './user-data.mock';

export const httpArgumentsHostMock = jest.fn().mockImplementation(() => ({
  getResponse: jest.fn().mockImplementation(() => ({
    status: jest.fn().mockImplementation(() => ({
      json: jest.fn().mockImplementation(({}) => ({})),
    })),
  })),

  getRequest: jest.fn().mockImplementation(() => ({ body: { username: userDataMock.username } })),
}));
