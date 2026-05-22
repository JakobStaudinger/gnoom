import { ObjectId } from 'mongodb';
import { DatabaseInstance } from '../testing/database-instance';
import { aggregate } from '../aggregate';
import { GnoomError } from '../types/error';

describe('$out', () => {
  describe('Type', () => {
    type Input = {
      name: string;
    };

    it('should disallow adding a stage after', () => {
      const error: GnoomError<{
        message: '$out must be the last stage in a pipeline.';
      }> = null!;

      aggregate().$out()('test').$addFields(error);
    });

    it('should allow using `$$new` in a `whenMatched` pipeline', () => {
      aggregate<Input>().$out<Input>()({
        into: 'test',
        whenMatched: (p) =>
          p.$addFields({
            updatedName: '$$new.name'
          })
      });
    });

    it('should allow accessing the variables from `let` in a `whenMatched` pipeline', () => {
      aggregate<Input>().$out<Input>()({
        into: 'test',
        let: {
          myVariable: { $concat: ['Hi', '$name'] }
        },
        whenMatched: (p) =>
          p.$addFields({
            updatedName: '$$myVariable'
          })
      });
    });

    it('should disallow accessing `$$new` if `let` is used', () => {
      const error: GnoomError<{ message: 'Key not found'; key: '$$new' }> =
        null!;

      aggregate<Input>().$out<Input>()({
        into: 'test',
        let: {
          myVariable: { $concat: ['Hi', '$name'] }
        },
        whenMatched: (p) =>
          p
            .$addFields({
              updatedName: '$$new.name'
            })
            .toArray(error)
      });
    });
  });

  describe('Runtime', () => {
    it('should return an empty array', async () => {
      const database = await DatabaseInstance.new();
      await database.insertData({
        test: [{ _id: new ObjectId() }, { _id: new ObjectId() }]
      });

      const result = await aggregate()
        .$out()('test2')
        .execute(database.collection('test'));

      expect(result).toHaveLength(0);

      await database.close();
    }, 20000);
  });
});
