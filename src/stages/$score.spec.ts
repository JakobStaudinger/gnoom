import { expectTypeOf } from 'expect-type';
import { aggregate } from '../aggregate';
import { ExtractDocumentType } from '../testing/extract-document-type';

describe('$score', () => {
  type Input = {
    averageRating: number;
    distance: number;
  };

  it('should not change the document type', () => {
    const _result = aggregate<Input>().$score({
      score: { $add: ['$averageRating', '$distance'] },
      normalization: 'minMaxScaler',
      weight: 0.7
    });

    type Result = ExtractDocumentType<typeof _result>;
    expectTypeOf<Result>().toEqualTypeOf<Input>();
  });
});
