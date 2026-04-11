import { ObjectId } from 'mongodb';
import { Aggregate, aggregate } from '../aggregate';
import { expectTypeOf } from 'expect-type';

describe('$project', () => {
  describe('Output', () => {
    type ExtractDocumentType<T> = T extends Aggregate<infer R> ? R : never;

    type InputDocument = {
      _id: ObjectId;
      n: number;
      s: string;
      b: boolean;
    };

    it('should only remove the given fields from the input type', () => {
      const _result = aggregate<InputDocument>().$project({ s: 0 });
      type Result = ExtractDocumentType<typeof _result>;
      expectTypeOf<Result>().toEqualTypeOf<Omit<InputDocument, 's'>>();
    });

    it('should only include the given fields from the input type', () => {
      const _result = aggregate<InputDocument>().$project({ s: 1 });
      type Result = ExtractDocumentType<typeof _result>;
      expectTypeOf<Result>().toExtend<Pick<InputDocument, '_id' | 's'>>();
    });

    // it('should disallow a mix of exclusion and inclusion', () => {
    //   // @ts-expect-error a mix of exclusion and inclusion specifications is forbidden
    //   const _result = aggregate<InputDocument>().$project({ s: 1, b: 0 });
    // });

    it('should allow explicitly omitting _id', () => {
      const _result = aggregate<InputDocument>().$project({ _id: 0, s: 1 });
      type Result = ExtractDocumentType<typeof _result>;
      expectTypeOf<Result>().toEqualTypeOf<Pick<InputDocument, 's'>>();
    });

    it('should allow setting field values with expressions', () => {
      const _result = aggregate<InputDocument>().$project({
        _id: 0,
        random: { $rand: {} }
      });
      type Result = ExtractDocumentType<typeof _result>;
      expectTypeOf<Result>().toEqualTypeOf<{ random: number }>();
    });
  });
});
