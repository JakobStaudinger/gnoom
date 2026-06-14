import { expectTypeOf } from 'expect-type';
import { aggregate } from '../aggregate';
import { ExtractDocumentType } from '../testing/extract-document-type';
import { GnoomError } from '../types/error';
import { AnyObject } from '../types/object';

describe('$querySettings', () => {
  interface Input {
    text: string;
  }

  it('should change the output document', () => {
    const _result = aggregate<Input>().$querySettings({});

    type Result = ExtractDocumentType<typeof _result>;
    expectTypeOf<Result>().toEqualTypeOf<{
      queryShapeHash: string;
      settings: {
        indexHints: {
          ns: { db: string; coll: string };
          allowedIndexes: string[];
        }[];
        queryFramework: 'classic' | 'sbe';
        comment?: string;
      };
      representativeQuery: AnyObject;
    }>();
  });

  it('should have to be the first stage in the pipeline', () => {
    const error: GnoomError<{
      message: 'Must be the first stage in a pipeline';
    }> = null!;

    aggregate<Input>().$addFields({}).$querySettings(error);
  });

  it('should include debugQueryShape if showDebugQueryShape is true', () => {
    const _result = aggregate<Input>().$querySettings({
      showDebugQueryShape: true
    });

    type Result = ExtractDocumentType<typeof _result>;
    expectTypeOf<Result>().toExtend<{
      debugQueryShape: AnyObject;
    }>();
  });
});
