import { expectTypeOf } from 'expect-type';
import { evaluate } from '../../../testing/evaluate';
import { InitialState } from '../../../types/aggregate-state';

describe('$percentile', () => {
  interface Input {
    array: number[];
  }

  it('should evaluate to a number when passing in a property', () => {
    const result = evaluate<InitialState<Input>>()({
      $percentile: { input: '$array', p: [99], method: 'approximate' }
    });
    expectTypeOf(result).toEqualTypeOf<number[]>();
  });

  it('should evaluate to a number when passing in a constant', () => {
    const result = evaluate<InitialState<Input>>()({
      $percentile: { input: [1, 2, 3], p: [99], method: 'approximate' }
    });
    expectTypeOf(result).toEqualTypeOf<number[]>();
  });
});
