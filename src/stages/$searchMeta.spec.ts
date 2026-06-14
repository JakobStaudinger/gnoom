import { expectTypeOf } from 'expect-type';
import { aggregate } from '../aggregate';
import { ExtractDocumentType } from '../testing/extract-document-type';

describe('$searchMeta', () => {
  type Input = {
    text: string;
    num: number;
    date: Date;
  };

  it('should include approximate count by default', () => {
    const _result = aggregate<Input>().$searchMeta({
      equals: {
        path: 'text',
        value: 'test'
      }
    });

    type Result = ExtractDocumentType<typeof _result>;
    expectTypeOf<Result>().toEqualTypeOf<{ count: { lowerBound: number } }>();
  });

  it('should include total when requested', () => {
    const _result = aggregate<Input>().$searchMeta({
      equals: {
        path: 'text',
        value: 'test'
      },
      count: {
        type: 'total'
      }
    });

    type Result = ExtractDocumentType<typeof _result>;
    expectTypeOf<Result>().toEqualTypeOf<{ count: { total: number } }>();
  });

  it('should include facets when using the facet collector', () => {
    const _result = aggregate<Input>().$searchMeta({
      facet: {
        facets: {
          myStringFacet: {
            type: 'string',
            path: 'text'
          },
          myNumberFacet: {
            type: 'number',
            boundaries: [1, 2],
            path: 'num'
          },
          myDateFacet: {
            type: 'date',
            boundaries: [new Date(), new Date()],
            path: 'date'
          },
          dateWithFallback: {
            type: 'date',
            boundaries: [new Date(), new Date()],
            path: 'date',
            default: 'fallback'
          },
          numberWithFallback: {
            type: 'number',
            boundaries: [1, 2],
            path: 'num',
            default: 'missing'
          }
        }
      }
    });

    type Result = ExtractDocumentType<typeof _result>;
    expectTypeOf<Result>().toEqualTypeOf<{
      count: { lowerBound: number };
      facet: {
        myStringFacet: {
          buckets: { _id: string; count: number }[];
        };
        myNumberFacet: {
          buckets: { _id: number; count: number }[];
        };
        myDateFacet: {
          buckets: { _id: Date; count: number }[];
        };
        dateWithFallback: {
          buckets: { _id: Date | 'fallback'; count: number }[];
        };
        numberWithFallback: {
          buckets: { _id: number | 'missing'; count: number }[];
        };
      };
    }>();
  });
});
