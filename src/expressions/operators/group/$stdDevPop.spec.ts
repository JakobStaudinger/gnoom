import { expectTypeOf } from 'expect-type';
import { evaluate } from '../../../testing/evaluate';
import { InitialState } from '../../../types/aggregate-state';

describe('$stdDevPop', () => {
  interface Input {
    array: number[];
  }

  it('should evaluate to a number when passing in a property', () => {
    const result = evaluate<InitialState<Input>>()({
      $stdDevPop: '$array'
    });
    expectTypeOf(result).toEqualTypeOf<number>();
  });

  it('should evaluate to a number when passing in a constant', () => {
    const result = evaluate<InitialState<Input>>()({
      $stdDevPop: [1, 2, 3]
    });
    expectTypeOf(result).toEqualTypeOf<number>();
  });
});
