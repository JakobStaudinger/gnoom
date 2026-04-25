import { ObjectId } from 'mongodb';
import { Aggregate, aggregate } from '../aggregate';
import { expectTypeOf } from 'expect-type';

describe('$bucket', () => {
  describe('Output', () => {
    type ExtractDocumentType<T> = T extends Aggregate<infer R> ? R : never;

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
