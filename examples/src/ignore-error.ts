import { aggregate } from '@gnoom/gnoom';

interface Input {
  myNumber: number;
  shouldIncrement: boolean;
}

aggregate<Input>()
  .$addFields({
    incremented: {
      $add: [
        '$myNumber',
        {
          $cond: {
            if: '$shouldIncrement',
            then: 1,
            else: 0
          }
        }
      ]
    }
  })
  .ignoreError('Invalid arguments passed to operator "$add"', '')
  .toArray();
