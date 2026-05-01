import { expectTypeOf } from 'expect-type';
import { ObjectId } from 'mongodb';
import { aggregate } from '../aggregate';
import { ExtractDocumentType } from '../testing/extract-document-type';

describe('$unset', () => {
  describe('Output', () => {
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
