import { expectTypeOf } from 'expect-type';
import { ObjectId } from 'mongodb';
import { aggregate } from '../aggregate';
import { ExtractDocumentType } from '../testing/extract-document-type';

describe('$setWindowFields', () => {
  describe('Output', () => {
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
