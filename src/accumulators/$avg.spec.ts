import { expectTypeOf } from 'expect-type';
import { InitialState } from '../types/aggregate-state';
import { evaluateAccumulator } from './testing/evaluate-accumulator';

describe('$avg', () => {
  interface Input {
    number: number;
  }

  it('should evaluate to a number when passing in a property', () => {
    const result = evaluateAccumulator<InitialState<Input>>()({
      $avg: '$number'
    });
    expectTypeOf(result).toEqualTypeOf<number>();
  });

  it('should evaluate to a number when passing in a constant', () => {
    const result = evaluateAccumulator<InitialState<Input>>()({
      $avg: 1
    });
    expectTypeOf(result).toEqualTypeOf<number>();
  });
});
