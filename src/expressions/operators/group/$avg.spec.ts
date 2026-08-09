import { expectTypeOf } from 'expect-type';
import { evaluate } from '../../../testing/evaluate';
import { InitialState } from '../../../types/aggregate-state';

describe('$avg', () => {
  interface Input {
    array: number[];
  }

  it('should evaluate to a number when passing in a property', () => {
    const result = evaluate<InitialState<Input>>()({
      $avg: '$array'
    });
    expectTypeOf(result).toEqualTypeOf<number>();
  });

  it('should evaluate to a number when passing in a constant', () => {
    const result = evaluate<InitialState<Input>>()({
      $avg: [1, 2, 3]
    });
    expectTypeOf(result).toEqualTypeOf<number>();
  });
});
