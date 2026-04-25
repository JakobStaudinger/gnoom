import { ObjectId } from 'mongodb';
import { Aggregate, aggregate } from '../aggregate';
import { expectTypeOf } from 'expect-type';

describe('$setWindowFields', () => {
  describe('Output', () => {
    type ExtractDocumentType<T> = T extends Aggregate<infer R> ? R : never;

    type InputDocument = {
      _id: ObjectId;
      n: number;
      s: string;
      b: boolean;
    };

    it('should add fields', () => {
      const _result = aggregate<InputDocument>().$setWindowFields({
        partitionBy: '$_id',
        sortBy: { n: -1 },
        output: {
          rank: { $rank: {} },
          firstFlag: { $first: '$b' }
        }
      });

      type Result = ExtractDocumentType<typeof _result>;
      expectTypeOf<Result>().toExtend<{ rank: number; firstFlag: unknown }>();
    });

    it('should keep fields of the input stage', () => {
      const _result = aggregate<InputDocument>().$setWindowFields({
        partitionBy: '$_id',
        sortBy: { n: -1 },
        output: {
          rank: { $rank: {} },
          firstFlag: { $first: '$b' }
        }
      });

      type Result = ExtractDocumentType<typeof _result>;
      expectTypeOf<Result>().toExtend<InputDocument>();
    });

    it('should overwrite fields of the input stage if they have the same name', () => {
      const _result = aggregate<InputDocument>().$setWindowFields({
        partitionBy: '$_id',
        sortBy: { n: -1 },
        output: {
          n: {
            $topN: {
              n: 1,
              sortBy: { n: -1 },
              output: '$b'
            }
          }
        }
      });

      type Result = ExtractDocumentType<typeof _result>['n'];
      expectTypeOf<Result>().toEqualTypeOf<boolean[]>();
    });
  });
});
