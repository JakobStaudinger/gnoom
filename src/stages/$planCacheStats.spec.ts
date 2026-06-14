import { expectTypeOf } from 'expect-type';
import { aggregate } from '../aggregate';
import { ExtractDocumentType } from '../testing/extract-document-type';
import { GnoomError } from '../types/error';
import { AnyObject } from '../types/object';

describe('$planCacheStats', () => {
  interface Input {
    text: string;
  }

  it('should change the output document', () => {
    const _result = aggregate<Input>().$planCacheStats({});

    type Result = ExtractDocumentType<typeof _result>;
    expectTypeOf<Result>().toEqualTypeOf<{
      version: number;
      createdFromQuery: AnyObject;
      isActive: boolean;
      planCacheShapeHash: string;
      planCacheKey: string;
      cachedPlan: AnyObject;
      works: number;
      timeOfCreation: Date;
      creationExecStats: AnyObject[];
      candidatePlanScores: number[];
      indexFilterSet: boolean;
      estimatedSizeBytes: number;
      querySettings: {
        indexHints: {
          ns: { db: string; coll: string };
          allowedIndexes: string[];
        }[];
        queryFramework: 'classic' | 'sbe';
      };
      host: string;
      shard?: string;
    }>();
  });

  it('should have to be the first stage in the pipeline', () => {
    const error: GnoomError<{
      message: 'Must be the first stage in a pipeline';
    }> = null!;

    aggregate<Input>().$addFields({}).$planCacheStats(error);
  });
});
