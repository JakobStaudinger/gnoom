import { expectTypeOf } from 'expect-type';
import { ObjectId } from 'mongodb';
import { aggregate } from '../aggregate';
import { ExtractDocumentType } from '../testing/extract-document-type';
import { GnoomError } from '../types/error';

describe('$replaceRoot', () => {
  type InputDocument = {
    _id: ObjectId;
    n: number;
    s: string;
    b: boolean;
    nested: {
      value: number;
    };
    nullable: { value: string } | null;
    array: object[];
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

    it('should accept expressions that evaluate to an object', () => {
      const _result = aggregate<InputDocument>().$replaceWith('$nested');
      type Result = ExtractDocumentType<typeof _result>;
      expectTypeOf<Result>().toEqualTypeOf<{
        value: number;
      }>();
    });

    it('should not accept expressions that evaluate to a non-object', () => {
      const _result = aggregate<InputDocument>().$replaceWith('$nullable');
      type Result = ExtractDocumentType<typeof _result>;
      expectTypeOf<Result>().toExtend<
        GnoomError<{
          message: '$replaceRoot requires an expression that evaluates to an object';
        }>
      >();
    });
  });
});
