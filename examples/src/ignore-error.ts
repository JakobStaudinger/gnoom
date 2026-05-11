import { aggregate } from '@gnoom/gnoom';

interface Input {
  myNumber: number;
  shouldIncrement: boolean;
}

aggregate<Input>()
  .$addFields({
    incremented: {
      $add: ['$myNumber', '$shouldIncrement']
    }
  })
  .ignoreError('Invalid arguments passed to operator "$add"', '')
  .toArray();
