import { expectTypeOf } from 'expect-type';
import { ObjectId } from 'mongodb';
import { aggregate } from '../aggregate';
import { ExtractDocumentType } from '../testing/extract-document-type';

describe('$skip', () => {
  describe('Output', () => {
    type InputDocument = {
      _id: ObjectId;
      n: number;
      s: string;
      b: boolean;
    };

    it('should not change the input type', () => {
      const _result = aggregate<InputDocument>().$skip(3);
      type Result = ExtractDocumentType<typeof _result>;
      expectTypeOf<Result>().toEqualTypeOf<InputDocument>();
    });
  });
});
