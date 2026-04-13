import { expectTypeOf } from 'expect-type';
import { Aggregate, aggregate } from '../aggregate';
import { ObjectId } from 'mongodb';

describe('$facet', () => {
  describe('Output', () => {
    type Document = {
      _id: ObjectId;
      price: number;
      datePublished: Date;
    };

    type ExtractDocumentType<T> = T extends Aggregate<infer R> ? R : never;

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
