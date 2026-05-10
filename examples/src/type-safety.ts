import { aggregate } from '@gnoom/gnoom';

interface Input {
  myNumber: number;
  myString: string;
}

aggregate<Input>()
  .$addFields({
    calculated: { $add: ['$myString', '$myNumber'] }
  })
  // @ts-expect-error Cannot add a string and a number. Hover over `toArray` below to see the error
  .toArray();
