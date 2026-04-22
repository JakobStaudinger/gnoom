import { aggregate } from '@gnoom/gnoom';

interface Employee {
  _id: string;
  name: string;
  managerId?: string;
}

const pipeline = aggregate<Employee>()
  .$graphLookup<Employee>()({
    from: 'employees',
    startWith: '$managerId',
    connectFromField: 'managerId',
    connectToField: '_id',
    as: 'managementChain',
    depthField: 'level'
  })
  .$project({
    name: 1,
    managementChain: 1
  })
  .toArray();

console.log(JSON.stringify(pipeline, undefined, 2));
