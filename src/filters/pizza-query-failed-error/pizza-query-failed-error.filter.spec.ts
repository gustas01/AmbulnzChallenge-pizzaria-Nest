import { QueryFailedError } from 'typeorm';
import { PizzaQueryFailedErrorFilter } from './pizza-query-failed-error.filter';
import { argumentsHostMock } from 'testing-mocks/arguments-host.mock';
import { httpArgumentsHostMock } from 'testing-mocks/http-arguments-host.mock';

describe('PizzaQueryFailedErrorFilter', () => {
  const filter: PizzaQueryFailedErrorFilter<QueryFailedError> = new PizzaQueryFailedErrorFilter();

  beforeEach(() => {
    httpArgumentsHostMock.mockClear();
  });

  it('should be defined', () => {
    expect(filter).toBeDefined();
  });

  it('should call be case code 23505 - user already exists', () => {
    filter.catch(
      new QueryFailedError('', [], { code: '23505', detail: 'error filter test' }),
      argumentsHostMock,
    );
    expect(filter.code).toEqual('23505');
    expect(httpArgumentsHostMock).toBeCalledWith();
    expect(httpArgumentsHostMock).toBeCalledTimes(2);
  });

  it('should call be case default - any other case', () => {
    filter.catch(new QueryFailedError('', [], { detail: 'error filter test' }), argumentsHostMock);
    expect(filter.code).toEqual('500');
    expect(httpArgumentsHostMock).toBeCalledWith();
    expect(httpArgumentsHostMock).toBeCalledTimes(2);
  });
});
