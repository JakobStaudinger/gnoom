import { expectTypeOf } from 'expect-type';
import { ObjectId } from 'mongodb';
import { aggregate } from '../aggregate';
import { ExtractDocumentType } from '../testing/extract-document-type';

describe('$facet', () => {
  describe('Output', () => {
    type Document = {
      _id: ObjectId;
      price: number;
      datePublished: Date;
    };

    it('should contain properties of all the sub-pipelines specified in the spec', () => {
      const _result = aggregate<Document>().$facet({
        documents: (p) => p.$skip(20).$limit(10),
        count: (p) => p.$count('count')
      });
      type Result = ExtractDocumentType<typeof _result>;
      expectTypeOf<Result>().toEqualTypeOf<{
        documents: Document[];
        count: { count: number }[];
      }>();
    });
  });
});
