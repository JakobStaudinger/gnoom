import { ObjectId } from 'mongodb';
import { Aggregate, aggregate } from '../aggregate';
import { expectTypeOf } from 'expect-type';

describe('$limit', () => {
  describe('Output', () => {
    type ExtractDocumentType<T> = T extends Aggregate<infer R> ? R : never;

    type InputDocument = {
      _id: ObjectId;
      n: number;
      s: string;
      b: boolean;
    };

    it('should not change the input type', () => {
      const _result = aggregate<InputDocument>().$limit(3);
      type Result = ExtractDocumentType<typeof _result>;
      expectTypeOf<Result>().toEqualTypeOf<InputDocument>();
    });
  });
});
