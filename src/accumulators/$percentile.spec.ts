import { expectTypeOf } from 'expect-type';
import { InitialState } from '../types/aggregate-state';
import { evaluateAccumulator } from './testing/evaluate-accumulator';

describe('$percentile', () => {
  interface Input {
    number: number;
  }

  it('should evaluate to a number when passing in a property', () => {
    const result = evaluateAccumulator<InitialState<Input>>()({
      $percentile: { input: '$number', method: 'approximate', p: [99] }
    });
    expectTypeOf(result).toEqualTypeOf<number[]>();
  });

  it('should evaluate to a number when passing in a constant', () => {
    const result = evaluateAccumulator<InitialState<Input>>()({
      $percentile: { input: 1, method: 'approximate', p: [99] }
    });
    expectTypeOf(result).toEqualTypeOf<number[]>();
  });
});
