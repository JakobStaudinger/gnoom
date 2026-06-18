import { expectTypeOf } from 'expect-type';
import { evaluate } from '../../../testing/evaluate';
import { InitialState } from '../../../types/aggregate-state';

describe('$first', () => {
  type Input = {
    array: number[];
    tuple: [string, boolean, number];
  };

  it('should return the first element of an array', () => {
    const result = evaluate<InitialState<Input>>()({ $first: '$array' });
    expectTypeOf(result).toEqualTypeOf<number>();
  });

  it('should work with tuple types', () => {
    const result = evaluate<InitialState<Input>>()({ $first: '$tuple' });
    expectTypeOf(result).toEqualTypeOf<string>();
  });
});
