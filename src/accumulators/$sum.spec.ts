import { expectTypeOf } from 'expect-type';
import { evaluateAccumulator } from './testing/evaluate-accumulator';
import { InitialState } from '../types/aggregate-state';

describe('$ifNull', () => {
  interface Input {
    number: number;
  }

  it('should evaluate to a number when passing in a property', () => {
    const result = evaluateAccumulator<InitialState<Input>>()({
      $sum: '$number'
    });
    expectTypeOf(result).toEqualTypeOf<number>();
  });

  it('should evaluate to a number when passing in a constant', () => {
    const result = evaluateAccumulator<InitialState<Input>>()({
      $sum: 1
    });
    expectTypeOf(result).toEqualTypeOf<number>();
  });
});
