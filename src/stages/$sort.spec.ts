import { expectTypeOf } from 'expect-type';
import { ObjectId } from 'mongodb';
import { aggregate } from '../aggregate';
import { ExtractDocumentType } from '../testing/extract-document-type';

describe('$sort', () => {
  describe('Output', () => {
    type InputDocument = {
      _id: ObjectId;
      n: number;
      s: string;
      b: boolean;
    };

    it('should not change the input type', () => {
      const _result = aggregate<InputDocument>().$sort({
        _id: 1,
        b: -1,
        s: { $meta: 'textScore' }
      });
      type Result = ExtractDocumentType<typeof _result>;
      expectTypeOf<Result>().toEqualTypeOf<InputDocument>();
    });
  });
});
