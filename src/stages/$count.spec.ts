import { ObjectId } from 'mongodb';
import { Aggregate, aggregate } from '../aggregate';
import { expectTypeOf } from 'expect-type';

describe('$count', () => {
  describe('Output', () => {
    type ExtractDocumentType<T> = T extends Aggregate<infer R> ? R : never;

    type InputDocument = {
      _id: ObjectId;
      n: number;
      s: string;
      b: boolean;
    };

    it('should output a number with the given name', () => {
      const _result = aggregate<InputDocument>().$count('myCount');
      type Result = ExtractDocumentType<typeof _result>['myCount'];
      expectTypeOf<Result>().toBeNumber();
    });

    it('should remove all other fields', () => {
      const _result = aggregate<InputDocument>().$count('myCount');
      type Result = ExtractDocumentType<typeof _result>;
      expectTypeOf<Result>().toEqualTypeOf<{ myCount: number }>();
    });
  });
});
