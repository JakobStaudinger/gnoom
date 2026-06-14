import { expectTypeOf } from 'expect-type';
import { aggregate } from '../aggregate';
import { ExtractDocumentType } from '../testing/extract-document-type';
import { GnoomError } from '../types/error';
import { UUID } from 'mongodb';
import { AnyObject } from '../types/object';

describe('$listSampledQueries', () => {
  interface Input {
    text: string;
  }

  it('should change the output document', () => {
    const _result = aggregate<Input>().$listSampledQueries({});

    type Result = ExtractDocumentType<typeof _result>;
    expectTypeOf<Result>().toEqualTypeOf<{
      _id: UUID;
      ns: string;
      collectionUuid: UUID;
      cmdName:
        | 'find'
        | 'aggregate'
        | 'count'
        | 'distinct'
        | 'update'
        | 'delete'
        | 'findAndModify';
      cmd: AnyObject;
      expireAt: Date;
    }>();
  });

  it('should have to be the first stage in the pipeline', () => {
    const error: GnoomError<{
      message: 'Must be the first stage in a pipeline';
    }> = null!;

    aggregate<Input>().$addFields({}).$listSampledQueries(error);
  });
});
