import { ObjectId } from 'mongodb';
import { DatabaseInstance } from '../testing/database-instance';
import { aggregate } from '../aggregate';

describe('$merge', () => {
  describe('Type', () => {
    it('should disallow adding a stage after', () => {
      aggregate()
        .$merge()('test')
        // @ts-expect-error $merge finalizes the aggregate
        .$addFields({ myField: 'hi' });
    });
  });

  describe('Runtime', () => {
    it('should return an empty array', async () => {
      const database = await DatabaseInstance.new();
      await database.insertData({
        test: [{ _id: new ObjectId() }, { _id: new ObjectId() }]
      });

      const result = await aggregate()
        .$merge()('test2')
        .execute(database.collection('test'));

      expect(result).toHaveLength(0);

      await database.close();
    }, 20000);
  });
});
