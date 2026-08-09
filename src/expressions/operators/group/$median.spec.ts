import { expectTypeOf } from 'expect-type';
import { evaluate } from '../../../testing/evaluate';
import { InitialState } from '../../../types/aggregate-state';

describe('$median', () => {
  interface Input {
    array: number[];
  }

  it('should evaluate to a number when passing in a property', () => {
    const result = evaluate<InitialState<Input>>()({
      $median: { input: '$array', method: 'approximate' }
    });
    expectTypeOf(result).toEqualTypeOf<number>();
  });

  it('should evaluate to a number when passing in a constant', () => {
    const result = evaluate<InitialState<Input>>()({
      $median: { input: [1, 2, 3], method: 'approximate' }
    });
    expectTypeOf(result).toEqualTypeOf<number>();
  });
});
