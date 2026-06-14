import { expectTypeOf } from 'expect-type';
import { aggregate } from '../aggregate';
import { ExtractDocumentType } from '../testing/extract-document-type';
import { GnoomError } from '../types/error';
import { AnyObject } from '../types/object';

describe('$listClusterCatalog', () => {
  interface Input {
    text: string;
  }

  it('should change the output document', () => {
    const _result = aggregate<Input>().$listClusterCatalog({});

    type Result = ExtractDocumentType<typeof _result>;
    expectTypeOf<Result>().toEqualTypeOf<{
      ns: string;
      db: string;
      type: 'collection' | 'view' | 'timeseries';
      idIndex?: AnyObject;
      options: AnyObject;
      info: AnyObject;
      sharded: boolean;
      shardKey?: AnyObject;
    }>();
  });

  it('should have to be the first stage in the pipeline', () => {
    const error: GnoomError<{
      message: 'Must be the first stage in a pipeline';
    }> = null!;

    aggregate<Input>().$addFields({}).$listClusterCatalog(error);
  });

  it('should include extra information when asking for shards', () => {
    const _result = aggregate<Input>().$listClusterCatalog({ shards: true });

    type Result = ExtractDocumentType<typeof _result>;
    expectTypeOf<Result>().toEqualTypeOf<{
      ns: string;
      db: string;
      type: 'collection' | 'view' | 'timeseries';
      idIndex?: AnyObject;
      options: AnyObject;
      info: AnyObject;
      sharded: boolean;
      shardKey?: AnyObject;
      shards?: string[];
    }>();
  });

  it('should include extra information when asking for balancingConfiguration', () => {
    const _result = aggregate<Input>().$listClusterCatalog({
      balancingConfiguration: true
    });

    type Result = ExtractDocumentType<typeof _result>;
    expectTypeOf<Result>().toEqualTypeOf<{
      ns: string;
      db: string;
      type: 'collection' | 'view' | 'timeseries';
      idIndex?: AnyObject;
      options: AnyObject;
      info: AnyObject;
      sharded: boolean;
      shardKey?: AnyObject;
      balancingEnabled?: boolean;
      balancingEnabledReason?: {
        enableBalancing: boolean;
        allowMigrations: boolean;
      };
      autoMergingEnabled?: boolean;
      chunkSize?: number;
    }>();
  });
});
