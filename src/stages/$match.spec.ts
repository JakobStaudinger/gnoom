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
      const _result = aggregate<Test>().$match({
        text: { $ne: null },
        digit: { $nin: [42] },
        array: { $elemMatch: 123 }
      });
      type Result = ExtractDocumentType<typeof _result>['mixed'];
      expectTypeOf<Result>().toEqualTypeOf<Test['mixed']>();
    });

    it('should work with multiple predicates', () => {
      const _result = aggregate<Test>().$match({
        mixed: { $ne: null, $nin: [true, false] }
      });
      type Result = ExtractDocumentType<typeof _result>['mixed'];
      expectTypeOf<Result>().toEqualTypeOf<string | number>();
    });

    it('should work with literals', () => {
      const _result = aggregate<Test>().$match({
        text: 'test-string'
      });
      type Result = ExtractDocumentType<typeof _result>['text'];

      expectTypeOf<Result>().toEqualTypeOf<'test-string'>();
    });

    it('should work with $eq', () => {
      const _result = aggregate<Test>().$match({
        text: { $eq: 'test-string' }
      });
      type Result = ExtractDocumentType<typeof _result>['text'];

      expectTypeOf<Result>().toEqualTypeOf<'test-string'>();
    });

    it('should work with $in', () => {
      const _result = aggregate<Test>().$match({
        mixed: { $in: ['string', 42] }
      });
      type Result = ExtractDocumentType<typeof _result>['mixed'];

      expectTypeOf<Result>().toEqualTypeOf<'string' | 42>();
    });

    it('should work with $ne', () => {
      const _result = aggregate<Test>().$match({
        digit: { $ne: null }
      });
      type Result = ExtractDocumentType<typeof _result>['digit'];

      expectTypeOf<Result>().toEqualTypeOf<number>();
    });

    it('should work with $nin', () => {
      const _result = aggregate<Test>().$match({
        mixed: { $nin: [true, false, null] }
      });
      type Result = ExtractDocumentType<typeof _result>['mixed'];

      expectTypeOf<Result>().toEqualTypeOf<number | string>();
    });

    it('should work with $not', () => {
      const _result = aggregate<Test>().$match({
        mixed: { $not: { $nin: [true, false, null] } }
      });
      type Result = ExtractDocumentType<typeof _result>['mixed'];

      expectTypeOf<Result>().toEqualTypeOf<boolean | null>();
    });

    it('should work with $type', () => {
      const _result = aggregate<Test>().$match({
        mixed: { $type: 'number' }
      });
      type Result = ExtractDocumentType<typeof _result>['mixed'];

      expectTypeOf<Result>().toEqualTypeOf<number>();
    });

    it('should work with $or', () => {
      const _result = aggregate<Test>().$match({
        $or: [{ mixed: { $type: 'number' } }, { mixed: { $type: 'string' } }]
      });
      type Result = ExtractDocumentType<typeof _result>['mixed'];

      expectTypeOf<Result>().toEqualTypeOf<number | string>();
    });

    it('should work with $and', () => {
      const _result = aggregate<{ mixed: string | 1 | 2 | 3 | 4 }>().$match({
        $and: [{ mixed: { $type: 'number' } }, { mixed: { $ne: 1 } }]
      });
      type Result = ExtractDocumentType<typeof _result>['mixed'];

      expectTypeOf<Result>().toEqualTypeOf<2 | 3 | 4>();
    });

    it('should work with a combination of $and and $or', () => {
      const _result = aggregate<{
        mixed: string | 1 | 2 | 3 | 4 | boolean;
      }>().$match({
        $and: [
          {
            $or: [{ mixed: { $type: 'number' } }, { mixed: { $type: 'bool' } }]
          },
          { mixed: { $ne: 1 } }
        ],
        $or: [{ mixed: { $in: [2, 3] } }, { mixed: { $eq: true } }]
      });
      type Result = ExtractDocumentType<typeof _result>['mixed'];

      expectTypeOf<Result>().toEqualTypeOf<2 | 3 | true>();
    });
  });
});
