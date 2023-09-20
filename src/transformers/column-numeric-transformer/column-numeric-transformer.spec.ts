import { ColumnNumericTransformer } from './column-numeric-transformer';

describe('ColumnNumericTransformer', () => {
  let transformer: ColumnNumericTransformer;

  beforeEach(() => {
    transformer = new ColumnNumericTransformer();
  });

  it('should be defined', () => {
    expect(transformer).toBeDefined();
  });

  it('should converter string to number', () => {
    expect(typeof transformer.from('2')).toBe('number');
    expect(transformer.from('2')).toBe(2);
  });
});
