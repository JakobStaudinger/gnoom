import { expectTypeOf } from 'expect-type';
import { aggregate } from '../aggregate';
import { ExtractDocumentType } from '../testing/extract-document-type';

describe('$addFields', () => {
  describe('Output', () => {
    type InputDocument = {
      n: number;
    };

    it('should add fields to the output type', () => {
      const _result = aggregate<InputDocument>().$addFields({
        s: 'something'
      });
      type Result = ExtractDocumentType<typeof _result>;
      type N = Result['n'];
      type S = Result['s'];
      expectTypeOf<N>().toBeNumber();
      expectTypeOf<S>().toBeString();
    });

    it('should work with operators', () => {
      const _result = aggregate<InputDocument>().$addFields({
        random: { $add: ['$n', { $rand: {} }] }
      });
      type Result = ExtractDocumentType<typeof _result>;
      type NewField = Result['random'];
      expectTypeOf<NewField>().toBeNumber();
    });

    it('should work with field paths', () => {
      const _result = aggregate<InputDocument>().$addFields({
        alias: '$n'
      });
      type Result = ExtractDocumentType<typeof _result>;
      type NewField = Result['alias'];

      expectTypeOf<NewField>().toBeNumber();
    });

    it('should overwrite fields in the input document type', () => {
      const _result = aggregate<InputDocument>().$addFields({
        n: 'new-value'
      });
      type Result = ExtractDocumentType<typeof _result>;
      type NewField = Result['n'];

      expectTypeOf<NewField>().toBeString();
    });

    it("should result in `never` when operator arguments don't match", () => {
      const _result = aggregate<InputDocument>().$addFields({
        random: { $add: ['my-string', { $rand: {} }] }
      });
      type Result = ExtractDocumentType<typeof _result>;
      type NewField = Result['random'];
      expectTypeOf<NewField>().toBeNever();
    });

    it('should result in `never` when any property key starts with $', () => {
      const _result = aggregate<InputDocument>().$addFields({
        random: { $add: ['my-string', { $rand: {} }], regularField: '' }
      });
      type Result = ExtractDocumentType<typeof _result>;
      type NewField = Result['random'];
      expectTypeOf<NewField>().toBeNever();
    });
  });
});
