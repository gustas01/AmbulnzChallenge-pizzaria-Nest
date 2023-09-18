import { Reflector } from '@nestjs/core';

export const reflectorMock = {
  get: jest.fn(),
  getAll: jest.fn(),
  getAllAndMerge: jest.fn(),
  getAllAndOverride: jest.fn(),
};
