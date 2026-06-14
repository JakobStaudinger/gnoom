import { expectTypeOf } from 'expect-type';
import { aggregate } from '../aggregate';
import { ExtractDocumentType } from '../testing/extract-document-type';
import { GnoomError } from '../types/error';

describe('$listSessions', () => {
  interface Input {
    text: string;
  }

  it('should change the output document', () => {
    const _result = aggregate<Input>().$listSessions({});

    type Result = ExtractDocumentType<typeof _result>;
    expectTypeOf<Result>().toEqualTypeOf<{
      user: { name: string };
      lastUse: Date;
    }>();
  });

  it('should have to be the first stage in the pipeline', () => {
    const error: GnoomError<{
      message: 'Must be the first stage in a pipeline';
    }> = null!;

    aggregate<Input>().$addFields({}).$listSessions(error);
  });
});
