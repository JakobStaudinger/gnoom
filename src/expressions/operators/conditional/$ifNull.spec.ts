import { expectTypeOf } from 'expect-type';
import { evaluate } from '../../../testing/evaluate';
import { InitialState } from '../../../types/aggregate-state';

describe('$ifNull', () => {
  interface Input {
    number: number | null | undefined;
    string: string | null | undefined;
    boolean: boolean | null | undefined;
    alwaysThere: string;
  }

  it('should evaluate to the union of all options', () => {
    const result = evaluate<InitialState<Input>>()({
      $ifNull: ['$number', '$string', '$boolean']
    });
    expectTypeOf(result).toEqualTypeOf<
      number | string | boolean | null | undefined
    >();
  });

  it('should determine nullability only based on the last argument', () => {
    const result = evaluate<InitialState<Input>>()({
      $ifNull: ['$number', '$string', '$boolean', '$alwaysThere']
    });
    expectTypeOf(result).toEqualTypeOf<number | string | boolean>();
  });
});
