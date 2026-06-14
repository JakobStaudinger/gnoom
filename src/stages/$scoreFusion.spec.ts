import { expectTypeOf } from 'expect-type';
import { aggregate } from '../aggregate';
import { ExtractDocumentType } from '../testing/extract-document-type';

describe('$scoreFusion', () => {
  type Input = {
    averageRating: number;
    distance: number;
  };

  it('should not change the document type', () => {
    const _result = aggregate<Input>().$scoreFusion({
      input: {
        pipelines: {
          rating: (p) => p.$sort({ averageRating: -1 }),
          distance: (p) => p.$sort({ distance: -1 })
        }
      }
    });

    type Result = ExtractDocumentType<typeof _result>;
    expectTypeOf<Result>().toEqualTypeOf<Input>();
  });

  it('should show an error when not specifying all pipelines in the weights', () => {
    aggregate<Input>().$scoreFusion({
      input: {
        pipelines: {
          foo: (p) => p,
          bar: (p) => p
        }
      },
      combination: {
        // @ts-expect-error - did not specify bar
        weights: {
          foo: 1
        }
      }
    });
  });

  it('should show an error when using a wrong pipeline name in the weights', () => {
    aggregate<Input>().$scoreFusion({
      input: {
        pipelines: {
          foo: (p) => p,
          bar: (p) => p
        }
      },
      combination: {
        weights: {
          foo: 1,
          // @ts-expect-error - did not specify bar
          baz: 2
        }
      }
    });
  });

  it('should allow using the pipeline names within `combination.expression`', () => {
    aggregate<Input>().$scoreFusion({
      input: {
        pipelines: {
          foo: (p) => p,
          bar: (p) => p
        }
      },
      combination: {
        method: 'expression',
        expression: {
          $sum: [{ $multiply: ['$$foo', 10] }, '$$bar']
        }
      }
    });
  });
});
