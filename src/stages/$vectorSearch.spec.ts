import { expectTypeOf } from 'expect-type';
import { aggregate } from '../aggregate';
import { ExtractDocumentType } from '../testing/extract-document-type';

describe('$vectorSearch', () => {
  type InputDocument = {
    embeddings: number[];
    value: string | number;
  };

  it('should do type narrowing when filter is provided', () => {
    const _result = aggregate<InputDocument>().$vectorSearch({
      index: 'my_search_index',
      path: 'embeddings',
      queryVector: [1, 2, 3],
      numCandidates: 500,
      limit: 10,
      filter: {
        value: { $in: [2, 3, 4] }
      }
    });

    type Result = ExtractDocumentType<typeof _result>;
    expectTypeOf<Result>().toExtend<{ value: 2 | 3 | 4 }>();
  });
});
