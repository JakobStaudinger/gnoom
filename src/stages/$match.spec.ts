import { expectTypeOf } from 'expect-type';
import { aggregate } from '../aggregate';
import { ExtractDocumentType } from '../testing/extract-document-type';

describe('$match', () => {
  describe('Type narrowing', () => {
    type InputDocumentType = {
      text: string | null;
      digit: number | null;
      mixed: string | number | boolean | null;
      array: (number | null)[] | null;
      nested: {
        number: number | null;
        string: string | null;
        rabbit: {
          hole: {
            without: {
              end?: string;
              rabbits: {
                name: string;
                age: number | undefined;
                furColor: string;
              }[];
            };
          };
        };
      };
    };

    it('should not narrow types that are not matched', () => {
      const _result = aggregate<InputDocumentType>().$match({
        text: { $ne: null },
        digit: { $nin: [42] },
        array: { $elemMatch: 123 }
      });
      type Result = ExtractDocumentType<typeof _result>['mixed'];
      expectTypeOf<Result>().toEqualTypeOf<InputDocumentType['mixed']>();
    });

    it('should work with multiple predicates', () => {
      const _result = aggregate<InputDocumentType>().$match({
        mixed: { $ne: null, $nin: [true, false] }
      });
      type Result = ExtractDocumentType<typeof _result>['mixed'];
      expectTypeOf<Result>().toEqualTypeOf<string | number>();
    });

    it('should work with literals', () => {
      const _result = aggregate<InputDocumentType>().$match({
        text: 'test-string'
      });
      type Result = ExtractDocumentType<typeof _result>['text'];

      expectTypeOf<Result>().toEqualTypeOf<'test-string'>();
    });

    it('should work with $eq', () => {
      const _result = aggregate<InputDocumentType>().$match({
        text: { $eq: 'test-string' }
      });
      type Result = ExtractDocumentType<typeof _result>['text'];

      expectTypeOf<Result>().toEqualTypeOf<'test-string'>();
    });

    it('should work with $in', () => {
      const _result = aggregate<InputDocumentType>().$match({
        mixed: { $in: ['string', 42] }
      });
      type Result = ExtractDocumentType<typeof _result>['mixed'];

      expectTypeOf<Result>().toEqualTypeOf<'string' | 42>();
    });

    it('should work with $ne', () => {
      const _result = aggregate<InputDocumentType>().$match({
        digit: { $ne: null }
      });
      type Result = ExtractDocumentType<typeof _result>['digit'];

      expectTypeOf<Result>().toEqualTypeOf<number>();
    });

    it('should work with $nin', () => {
      const _result = aggregate<InputDocumentType>().$match({
        mixed: { $nin: [true, false, null] }
      });
      type Result = ExtractDocumentType<typeof _result>['mixed'];

      expectTypeOf<Result>().toEqualTypeOf<number | string>();
    });

    it('should work with $not', () => {
      const _result = aggregate<InputDocumentType>().$match({
        mixed: { $not: { $nin: [true, false, null] } }
      });
      type Result = ExtractDocumentType<typeof _result>['mixed'];

      expectTypeOf<Result>().toEqualTypeOf<boolean | null>();
    });

    it('should work with $type', () => {
      const _result = aggregate<InputDocumentType>().$match({
        mixed: { $type: 'number' }
      });
      type Result = ExtractDocumentType<typeof _result>['mixed'];

      expectTypeOf<Result>().toEqualTypeOf<number>();
    });

    it('should work with $or', () => {
      const _result = aggregate<InputDocumentType>().$match({
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

    it.skip('should do type narrowing on deep keys', () => {
      const _result = aggregate<InputDocumentType>().$match({
        nested: { number: { $type: 'number' } },
        'nested.string': { $type: 'string' },
        'nested.rabbit.hole.without.rabbits.age': { $type: 'number' }
      });
      type _ResultN = ExtractDocumentType<typeof _result>['nested']['number'];
      type _ResultS = ExtractDocumentType<typeof _result>['nested']['string'];
      type _ResultSuperNested = ExtractDocumentType<
        typeof _result
      >['nested']['rabbit']['hole']['without']['rabbits'][number]['age'];

      // TODO:
      // expectTypeOf<ResultN>().toBeNumber();
      // expectTypeOf<ResultS>().toBeString();
      // expectTypeOf<ResultSuperNested>().toBeNumber();
    });
  });
});
