import { expectTypeOf } from 'expect-type';
import { ObjectId } from 'mongodb';
import { aggregate } from '../aggregate';
import { ExtractDocumentType } from '../testing/extract-document-type';

describe('$sortByCount', () => {
  describe('Output', () => {
    type InputDocument = {
      _id: ObjectId;
      n: number;
      s: string;
      b: boolean;
    };

    it('should not change the input type', () => {
      const _result = aggregate<InputDocument>().$sortByCount({
        n: '$n',
        b: '$b'
      });
      type Result = ExtractDocumentType<typeof _result>;
      expectTypeOf<Result>().toEqualTypeOf<{
        _id: { n: number; b: boolean };
        count: number;
      }>();
    });
  });
});
