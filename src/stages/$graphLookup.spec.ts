import { expectTypeOf } from 'expect-type';
import { Aggregate, aggregate } from '../aggregate';
import { ObjectId } from 'mongodb';

describe('$graphLookup', () => {
  describe('Output', () => {
    type Account = {
      _id: ObjectId;
      name: string;
      followers: ObjectId[];
    };

    type ExtractDocumentType<T> = T extends Aggregate<infer R> ? R : never;

    it('should add a property with the name specified in `as`', () => {
      const _result = aggregate<Account>().$graphLookup<Account>()({
        from: 'accounts',
        startWith: '$_id',
        connectFromField: '_id',
        connectToField: 'followers',
        as: 'followerChain'
      });
      type Result = ExtractDocumentType<typeof _result>;
      expectTypeOf<'followerChain'>().toExtend<keyof Result>();
    });

    it('should add a property for the depthField', () => {
      const _result = aggregate<Account>().$graphLookup<Account>()({
        from: 'accounts',
        startWith: '$_id',
        connectFromField: '_id',
        connectToField: 'followers',
        as: 'followerChain',
        depthField: 'degreesOfSeparation'
      });
      type Result = ExtractDocumentType<typeof _result>;
      expectTypeOf<'degreesOfSeparation'>().toExtend<keyof Result>();
    });
  });
});
