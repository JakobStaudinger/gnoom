import { expectQueryPredicate } from '../../testing/expect-query-predicate';
import { InitialState } from '../../types/aggregate-state';

describe('$in', () => {
  it('accepts values for a dotted path through an array of embedded documents', () => {
    interface Document {
      nested: {
        items: { value: string }[];
      };
    }

    const values: string[] = ['first', 'second'];

    expectQueryPredicate<InitialState<Document>>()({
      'nested.items.value': { $in: values }
    }).toBeValid();
  });

  it('still has type-safety for embedded documents', () => {
    interface Document {
      nested: {
        items: { value: string }[];
      };
    }

    expectQueryPredicate<InitialState<Document>>()({
      'nested.items.value': { $in: [1, 2] }
    }).toBeInvalid();
  });
});
