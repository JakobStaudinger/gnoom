import { expectTypeOf } from 'expect-type';
import { InitialState } from '../types/aggregate-state';
import { evaluateAccumulator } from './testing/evaluate-accumulator';

describe('$min', () => {
  interface Input {
    number: number;
  }

  it('should evaluate to a number when passing in a property', () => {
    const result = evaluateAccumulator<InitialState<Input>>()({
      $min: '$number'
    });
    expectTypeOf(result).toEqualTypeOf<number>();
  });

  it('should evaluate to a number when passing in a constant', () => {
    const result = evaluateAccumulator<InitialState<Input>>()({
      $min: 1
    });
    expectTypeOf(result).toEqualTypeOf<number>();
  });

  it('should work with strings', () => {
    const result = evaluateAccumulator<InitialState<Input>>()({
      $min: 'hi'
    });
    expectTypeOf(result).toEqualTypeOf<string>();
  });
});
