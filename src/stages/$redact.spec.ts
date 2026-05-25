import { aggregate } from '../aggregate';
import { GnoomError } from '../types/error';

describe('$redact', () => {
  type Input = {
    value: number;
    date: { date: Date };
  };

  it('should be an error when the given expression evaluates to a regular value', () => {
    const error: GnoomError<{
      message: 'The expression given to $redact must evaluate to $$KEEP, $$PRUNE or $$DESCEND';
      actual: 42;
    }> = null!;

    aggregate().$redact(42).toArray(error);
  });

  it('should allow an expression that evaluates to $$KEEP, $$PRUNE or $$DESCEND', () => {
    aggregate<Input>()
      .$redact({
        $switch: {
          branches: [
            { case: { $eq: ['$value', 1] }, then: '$$KEEP' },
            { case: { $eq: ['$value', 2] }, then: '$$DESCEND' }
          ],
          default: '$$PRUNE'
        }
      })
      .toArray();
  });
});
