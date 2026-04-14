import { expectTypeOf } from 'expect-type';
import { ObjectId } from 'mongodb';
import { aggregate, Aggregate } from '../aggregate';

describe('$replaceRoot', () => {
  type ExtractDocumentType<T> = T extends Aggregate<infer R> ? R : never;

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
