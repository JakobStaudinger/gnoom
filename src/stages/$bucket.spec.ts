import { expectTypeOf } from 'expect-type';
import { ObjectId } from 'mongodb';
import { aggregate } from '../aggregate';
import { ExtractDocumentType } from '../testing/extract-document-type';

describe('$bucket', () => {
  describe('Output', () => {
    type InputDocument = {
      _id: ObjectId;
      n: number;
      s: string;
      b: boolean;
    };

    it('should output the _id field', () => {
      const _result = aggregate<InputDocument>().$bucket({
        groupBy: '$n',
        boundaries: [10, 20, 30]
      });
      type Result = ExtractDocumentType<typeof _result>;
      expectTypeOf<Result>().toExtend<{ _id: number }>();
    });

    it('should add aggregated fields', () => {
      const _result = aggregate<InputDocument>().$bucket({
        groupBy: '$n',
        boundaries: [10, 20, 100],
        output: {
          strings: { $addToSet: '$s' },
          lowest: { $min: '$n' }
        }
      });
      type Result = ExtractDocumentType<typeof _result>;
      expectTypeOf<Result>().toExtend<{
        _id: number;
        strings: string[];
        lowest: number;
      }>();
    });
  });
});
