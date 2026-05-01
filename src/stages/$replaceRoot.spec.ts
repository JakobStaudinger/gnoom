import { expectTypeOf } from 'expect-type';
import { ObjectId } from 'mongodb';
import { aggregate } from '../aggregate';
import { ExtractDocumentType } from '../testing/extract-document-type';

describe('$replaceRoot', () => {
  type InputDocument = {
    _id: ObjectId;
    n: number;
    s: string;
    b: boolean;
  };

  describe('Output', () => {
    it('should replace the type entirely', () => {
      const _result = aggregate<InputDocument>().$replaceRoot({
        newRoot: {
          newNumber: '$n',
          newString: { $concat: ['hi', '$s'] },
          random: { $rand: {} }
        }
      });
      type Result = ExtractDocumentType<typeof _result>;
      expectTypeOf<Result>().toEqualTypeOf<{
        newNumber: number;
        newString: string;
        random: number;
      }>();
    });

    it('should work with $replaceWith', () => {
      const _result = aggregate<InputDocument>().$replaceWith({
        newNumber: '$n',
        newString: { $concat: ['hi', '$s'] },
        random: { $rand: {} }
      });
      type Result = ExtractDocumentType<typeof _result>;
      expectTypeOf<Result>().toEqualTypeOf<{
        newNumber: number;
        newString: string;
        random: number;
      }>();
    });
  });
});
