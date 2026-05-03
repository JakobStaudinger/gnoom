import { expectTypeOf } from 'expect-type';
import { ObjectId } from 'mongodb';
import { aggregate } from '../aggregate';
import { ExtractDocumentType } from '../testing/extract-document-type';

describe('$densify', () => {
  describe('Output', () => {
    type InputDocument = {
      _id: ObjectId;
      n: number;
      b: boolean;
      d: Date;
      maybeN?: number | null;
      nested: {
        maybeD?: Date | null;
      };
    };

    it('should make all other fields optional', () => {
      const _result = aggregate<InputDocument>().$densify({
        field: 'n',
        partitionByFields: ['b'],
        range: {
          bounds: 'full',
          step: 1
        }
      });
      type Result = ExtractDocumentType<typeof _result>;
      expectTypeOf<Result>().toEqualTypeOf<{
        _id: ObjectId | undefined;
        n: number;
        b: boolean;
        d: Date | undefined;
        maybeN: number | null | undefined;
        nested:
          | {
              maybeD?: Date | null;
            }
          | undefined;
      }>();
    });
  });
});
