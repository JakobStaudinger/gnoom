import { aggregate } from '../aggregate';

describe('$search', () => {
  type Input = {
    text: string;
  };

  it('should exist', () => {
    aggregate<Input>().$search({});
  });
});
