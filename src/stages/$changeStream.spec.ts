import { expectTypeOf } from 'expect-type';
import { aggregate } from '../aggregate';
import { ExtractDocumentType } from '../testing/extract-document-type';
import { ObjectId } from 'mongodb';

describe('$changeStream', () => {
  describe('Output', () => {
    type InputDocument = {
      _id: ObjectId;
      n: number;
      b: boolean;
    };

    it('should replace the type with change events', () => {
      const _result = aggregate<InputDocument>().$changeStream({});
      type Result = ExtractDocumentType<typeof _result>;
      expectTypeOf<Result['operationType']>().toEqualTypeOf<
        | 'create'
        | 'createIndexes'
        | 'delete'
        | 'drop'
        | 'dropDatabase'
        | 'dropIndexes'
        | 'insert'
        | 'invalidate'
        | 'modify'
        | 'refineCollectionShardKey'
        | 'rename'
        | 'replace'
        | 'reshardCollection'
        | 'shardCollection'
        | 'update'
      >();
    });

    describe('fullDocument', () => {
      it('should be included if the option is set to `required`', () => {
        const _result = aggregate<InputDocument>().$changeStream({
          fullDocument: 'required'
        });
        type Result = ExtractDocumentType<typeof _result>;
        expectTypeOf<
          Extract<Result, { operationType: 'update' }>['fullDocument']
        >().toEqualTypeOf<InputDocument>();
      });

      it('should not be included if the option is set to `default`', () => {
        const _result = aggregate<InputDocument>().$changeStream({
          fullDocument: 'default'
        });
        type Result = ExtractDocumentType<typeof _result>;
        expectTypeOf<'fullDocument'>().not.toExtend<
          keyof Extract<Result, { operationType: 'update' }>
        >();
      });

      it('should be nullable if the option is set to `whenAvailable`', () => {
        const _result = aggregate<InputDocument>().$changeStream({
          fullDocument: 'whenAvailable'
        });
        type Result = ExtractDocumentType<typeof _result>;
        expectTypeOf<
          Extract<Result, { operationType: 'update' }>['fullDocument']
        >().toEqualTypeOf<InputDocument | null>();
      });
    });
  });
});
