import { expectTypeOf } from 'expect-type';
import { aggregate } from '../aggregate';
import { ExtractDocumentType } from '../testing/extract-document-type';
import { ObjectId } from 'mongodb';

describe('$changeStreamSplitLargeEvent', () => {
  describe('Output', () => {
    type InputDocument = {
      _id: ObjectId;
      n: number;
      b: boolean;
    };

    it('should make the output fields optional', () => {
      const _result = aggregate<InputDocument>()
        .$changeStream({})
        .$changeStreamSplitLargeEvent({});
      type Result = ExtractDocumentType<typeof _result>;
      expectTypeOf<{ splitEvent: { fragment: 1; of: 1 } }>().toExtend<Result>();
    });
  });
});
