import { ObjectId } from 'mongodb';
import { DatabaseInstance } from '../testing/database-instance';
import { aggregate } from '../aggregate';

describe('$out', () => {
  describe('Type', () => {
    it('should disallow adding a stage after', () => {
      aggregate()
        .$out()('test')
        // @ts-expect-error $out finalizes the aggregate
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
        .$out()('test2')
        .execute(database.collection('test'));

      expect(result).toHaveLength(0);

      await database.close();
    }, 20000);
  });
});
