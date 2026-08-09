import { expectTypeOf } from 'expect-type';
import { InitialState } from '../types/aggregate-state';
import { evaluateAccumulator } from './testing/evaluate-accumulator';

describe('$minN', () => {
  interface Input {
    number: number;
  }

  it('should evaluate to a number when passing in a property', () => {
    const result = evaluateAccumulator<InitialState<Input>>()({
      $minN: {
        input: '$number',
        n: 3
      }
    });
    expectTypeOf(result).toEqualTypeOf<number[]>();
  });

  it('should evaluate to a number when passing in a constant', () => {
    const result = evaluateAccumulator<InitialState<Input>>()({
      $minN: { input: 1, n: 3 }
    });
    expectTypeOf(result).toEqualTypeOf<number[]>();
  });

  it('should work with strings', () => {
    const result = evaluateAccumulator<InitialState<Input>>()({
      $minN: { input: 'hi', n: 10 }
    });
    expectTypeOf(result).toEqualTypeOf<string[]>();
  });
});
