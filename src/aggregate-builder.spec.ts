import { AggregateBuilder } from './aggregate-builder';

describe('AggregateBuilder', () => {
  it('should produce an array as output', () => {
    expect(AggregateBuilder.new().compile()).toEqual([]);
  });
});
