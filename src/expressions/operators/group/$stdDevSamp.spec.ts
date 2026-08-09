import { expectTypeOf } from 'expect-type';
import { evaluate } from '../../../testing/evaluate';
import { InitialState } from '../../../types/aggregate-state';

describe('$stdDevSamp', () => {
  interface Input {
    array: number[];
  }

  it('should evaluate to a number when passing in a property', () => {
    const result = evaluate<InitialState<Input>>()({
      $stdDevSamp: '$array'
    });
    expectTypeOf(result).toEqualTypeOf<number>();
  });

  it('should evaluate to a number when passing in a constant', () => {
    const result = evaluate<InitialState<Input>>()({
      $stdDevSamp: [1, 2, 3]
    });
    expectTypeOf(result).toEqualTypeOf<number>();
  });
});
