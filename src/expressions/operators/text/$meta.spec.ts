import { expectTypeOf } from 'expect-type';
import { evaluate } from '../../../testing/evaluate';
import { InitialState } from '../../../types/aggregate-state';

describe('$meta', () => {
  interface Input {
    value: string;
  }

  it('should return number for textScore', () => {
    const result = evaluate<InitialState<Input>>()({
      $meta: 'textScore'
    });
    expectTypeOf(result).toEqualTypeOf<number>();
  });

  it('should return highlights for searchHighlights', () => {
    const result = evaluate<InitialState<Input>>()({
      $meta: 'searchHighlights'
    });
    expectTypeOf(result).toEqualTypeOf<
      {
        path: string;
        score?: number;
        texts: { value: string; type: 'hit' | 'text' }[];
      }[]
    >();
  });
});
