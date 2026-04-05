import { Aggregate, aggregate } from '../aggregate';
import { expectTypeOf } from 'expect-type';

type Test = {
  text: string | null;
  digit: number | null;
  mixed: string | number | boolean | null;
  array: (number | null)[] | null;
};

type ExtractDocumentType<T> = T extends Aggregate<infer R> ? R : never;

describe('$match', () => {
  describe('Type narrowing', () => {
    it('should not narrow types that are not matched', () => {
      const result = aggregate<Test>().$match({
        text: { $ne: null },
        digit: { $nin: [42] },
        array: { $elemMatch: 123 }
      });
      type Result = ExtractDocumentType<typeof result>['mixed'];
      expectTypeOf<Result>().toEqualTypeOf<Test['mixed']>;
    });

    it('should work with $eq', () => {
      const result = aggregate<Test>().$match({
        text: { $eq: 'test-string' }
      });
      type Result = ExtractDocumentType<typeof result>['text'];

      expectTypeOf<Result>().toEqualTypeOf<'test-string'>();
    });

    it('should work with $in', () => {
      const result = aggregate<Test>().$match({
        mixed: { $in: ['string', 42] }
      });
      type Result = ExtractDocumentType<typeof result>['mixed'];

      expectTypeOf<Result>().toEqualTypeOf<'string' | 42>();
    });

    it('should work with $ne', () => {
      const result = aggregate<Test>().$match({
        digit: { $ne: null }
      });
      type Result = ExtractDocumentType<typeof result>['digit'];

      expectTypeOf<Result>().toEqualTypeOf<number>();
    });

    it('should work with $nin', () => {
      const result = aggregate<Test>().$match({
        mixed: { $nin: [true, false, null] }
      });
      type Result = ExtractDocumentType<typeof result>['mixed'];

      expectTypeOf<Result>().toEqualTypeOf<number | string>();
    });

    it('should work with $not', () => {
      const result = aggregate<Test>().$match({
        mixed: { $not: { $nin: [true, false, null] } }
      });
      type Result = ExtractDocumentType<typeof result>['mixed'];

      expectTypeOf<Result>().toEqualTypeOf<boolean | null>();
    });
  });
});
