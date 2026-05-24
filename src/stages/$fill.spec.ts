import { expectTypeOf } from 'expect-type';
import { ObjectId } from 'mongodb';
import { aggregate } from '../aggregate';
import { ExtractDocumentType } from '../testing/extract-document-type';

describe('$fill', () => {
  type InputDocument = {
    _id: ObjectId;
    n: number;
    b: boolean;
    d: Date;
    maybeN?: number | null;
    nested: {
      maybeD?: Date | null;
      unrelated: string | null;
    } | null;
  };

  it('should make the filled properties non-nullable', () => {
    const _result = aggregate<InputDocument>().$fill({
      partitionByFields: ['d'],
      output: {
        maybeN: { value: 2 },
        'nested.maybeD': { value: 5 }
      }
    });
    type Result = ExtractDocumentType<typeof _result>;
    expectTypeOf<Result>().toExtend<{
      maybeN: number;
      nested: {
        maybeD: Date;
        unrelated?: string | null;
      };
    }>();
  });

  it('should require sortBy if method is used in one of the outputs', () => {
    // @ts-expect-error sortBy is required
    aggregate<InputDocument>().$fill({
      partitionByFields: ['d'],
      output: {
        maybeN: { method: 'linear' },
        'nested.maybeD': { method: 'linear' }
      }
    });
  });
});
