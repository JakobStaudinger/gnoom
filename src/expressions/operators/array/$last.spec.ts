import { expectTypeOf } from 'expect-type';
import { evaluate } from '../../../testing/evaluate';
import { InitialState } from '../../../types/aggregate-state';

describe('$last', () => {
  type Input = {
    array: number[];
    tuple: [string, boolean, number];
  };

  it('should return the last element of an array', () => {
    const result = evaluate<InitialState<Input>>()({ $last: '$array' });
    expectTypeOf(result).toEqualTypeOf<number>();
  });

  it('should work with tuple types', () => {
    const result = evaluate<InitialState<Input>>()({ $last: '$tuple' });
    expectTypeOf(result).toEqualTypeOf<number>();
  });
});
