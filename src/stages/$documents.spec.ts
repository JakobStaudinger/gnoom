import { expectTypeOf } from 'expect-type';
import { ObjectId } from 'mongodb';
import { aggregate } from '../aggregate';
import { ExtractDocumentType } from '../testing/extract-document-type';
import { GnoomError } from '../types/error';

describe('$documents', () => {
  describe('Output', () => {
    type InputDocument = {
      _id: ObjectId;
      n: number;
      s: string;
      b: boolean;
    };

    it('should remove all other fields', () => {
      const _result = aggregate<InputDocument>().$documents([
        { x: 1 },
        { x: 2 },
        { x: 4 },
        { x: 8 }
      ]);
      type Result = ExtractDocumentType<typeof _result>;
      expectTypeOf<Result>().toExtend<{ x: number }>();
    });

    it('should result in an error when the input is not an array', () => {
      const _result = aggregate<InputDocument>().$documents({
        hello: 'world'
      });

      type Result = ExtractDocumentType<typeof _result>;
      expectTypeOf<Result>().toEqualTypeOf<
        GnoomError<{
          message: 'Aggregate expression must resolve to an array of objects.';
        }>
      >();
    });
  });
});
