import { expectTypeOf } from 'expect-type';
import { aggregate } from '../aggregate';
import { ExtractDocumentType } from '../testing/extract-document-type';
import { AnyObject } from '../types/object';
import { GnoomError } from '../types/error';

describe('$indexStats', () => {
  interface Input {
    text: string;
  }

  it('should change the output document', () => {
    const _result = aggregate<Input>().$indexStats({});

    type Result = ExtractDocumentType<typeof _result>;
    expectTypeOf<Result>().toEqualTypeOf<{
      name: string;
      key: AnyObject;
      host: string;
      accesses: { ops: number; since: Date };
      shard?: string;
      building?: true;
      spec?: {
        v: number;
        name: string;
        key: AnyObject;
      };
    }>();
  });

  it('should have to be the first stage in the pipeline', () => {
    const error: GnoomError<{
      message: 'Must be the first stage in a pipeline';
    }> = null!;

    aggregate<Input>().$addFields({}).$indexStats(error);
  });
});
