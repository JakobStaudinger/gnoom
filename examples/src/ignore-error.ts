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
  .addToType<{ incremented: number }>()
  .toArray();
