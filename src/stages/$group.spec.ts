import { expectTypeOf } from 'expect-type';
import { ObjectId } from 'mongodb';
import { aggregate } from '../aggregate';
import { ExtractDocumentType } from '../testing/extract-document-type';

describe('$group', () => {
  describe('Output', () => {
    type InputDocument = {
      _id: ObjectId;
      n: number;
      s: string;
      b: boolean;
    };

    it('should output the _id field', () => {
      const _result = aggregate<InputDocument>().$group({ _id: '$n' });
      type Result = ExtractDocumentType<typeof _result>;
      expectTypeOf<Result>().toExtend<{ _id: number }>();
    });

    it('should add aggregated fields', () => {
      const _result = aggregate<InputDocument>().$group({
        _id: '$b',
        strings: { $addToSet: '$s' },
        lowest: { $min: '$n' }
      });
      type Result = ExtractDocumentType<typeof _result>;
      expectTypeOf<Result>().toExtend<{
        _id: boolean;
        strings: string[];
        lowest: number;
      }>();
    });
  });
});
