import { aggregate } from '@gnoom/gnoom';

interface CustomDocument {
  _id: string;
  name: string;
  fieldToBeRemoved: boolean;
}

const pipeline = aggregate<CustomDocument>()
  .custom({ $myStage: {} })
  .refine((r) =>
    r
      .addProperties<{ customField: number }>()
      .removeProperties<'fieldToBeRemoved'>()
  )
  .$match({ customField: { $lt: 2 } })
  // @ts-expect-error fieldToBeRemoved was removed
  .$match({ fieldToBeRemoved: true })
  .toArray();

console.log(JSON.stringify(pipeline, undefined, 2));
