import { aggregate } from '@gnoom/gnoom';

interface Document {
  _id: string;
  type: string;
  payload?: Record<string, unknown>;
  archived: boolean;
}

const pipeline = aggregate<Document>()
  .$project({
    type: 1,
    payload: {
      $cond: [{ $eq: ['$archived', true] }, '$$REMOVE', '$payload']
    }
  })
  .toArray();

console.log(JSON.stringify(pipeline, undefined, 2));
