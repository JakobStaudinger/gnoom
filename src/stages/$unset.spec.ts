import { ObjectId } from 'mongodb';
import { Aggregate, aggregate } from '../aggregate';
import { expectTypeOf } from 'expect-type';

describe('$unset', () => {
  describe('Output', () => {
    type ExtractDocumentType<T> = T extends Aggregate<infer R> ? R : never;

    type InputDocument = {
      _id: ObjectId;
      n: number;
      s: string;
      b: boolean;
    };

    it('should remove the given field from the input type', () => {
      const _result = aggregate<InputDocument>().$unset('s');
      type Result = ExtractDocumentType<typeof _result>;
      expectTypeOf<Result>().toEqualTypeOf<Omit<InputDocument, 's'>>();
    });

    it('should remove multiple fields from the input type', () => {
      const _result = aggregate<InputDocument>().$unset(['s', 'n']);
      type Result = ExtractDocumentType<typeof _result>;
      expectTypeOf<Result>().toEqualTypeOf<Omit<InputDocument, 's' | 'n'>>();
    });
  });
});
