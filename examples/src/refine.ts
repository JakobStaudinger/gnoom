import { aggregate } from '@gnoom/gnoom';

interface CustomDocument {
  _id: string;
  name: string;
  fieldToBeRemoved: boolean;
}

const pipeline = aggregate<CustomDocument>()
  .custom({ $myStage: {} })
  .addToType<{ customField: number }>()
  .addToType({ inferredFromValue: 'should be a string' })
  .$match({ customField: { $lt: 2 }, inferredFromValue: { $in: ['string'] } })
  .removeFromType<'fieldToBeRemoved'>()
  // @ts-expect-error fieldToBeRemoved was removed from the type
  .$match({ fieldToBeRemoved: true })
  .replaceType<{ completelyDifferent: string; nested: { property: number } }>()
  .$match({ completelyDifferent: 'totally' })
  .modifyType((obj) => ({ root: obj }))
  .$match({ 'root.nested.property': { $eq: 10 } })
  .toArray();

console.log(JSON.stringify(pipeline, undefined, 2));
