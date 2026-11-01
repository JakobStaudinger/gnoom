import { expectTypeOf } from 'expect-type';
import { expectQueryPredicate } from '../testing/expect-query-predicate';
import { InitialState } from '../types/aggregate-state';
import { DeepType } from '../types/deep';

describe('Query predicates on optional embedded documents', () => {
  interface Document {
    optional?: { value: string };
    nullable: { value: number } | null;
    nested?: { child?: { value: number } | null } | null;
  }

  it('accepts operators on dotted paths through optional and nullable documents', () => {
    expectQueryPredicate<InitialState<Document>>()({
      'optional.value': { $in: ['first', 'second'] },
      'nullable.value': { $gt: 0 },
      'nested.child.value': { $eq: 42 }
    }).toBeValid();
  });

  it('rejects values of the wrong type on those paths', () => {
    expectQueryPredicate<InitialState<Document>>()({
      'optional.value': { $in: [1, 2] }
    }).toBeInvalid();
    expectQueryPredicate<InitialState<Document>>()({
      'nullable.value': { $gt: 'zero' }
    }).toBeInvalid();
    expectQueryPredicate<InitialState<Document>>()({
      'nested.child.value': { $eq: '42' }
    }).toBeInvalid();
  });

  it('preserves null and undefined when resolving nested field types', () => {
    expectTypeOf<DeepType<Document, 'optional.value'>>().toEqualTypeOf<
      string | undefined
    >();
    expectTypeOf<DeepType<Document, 'nullable.value'>>().toEqualTypeOf<
      number | null
    >();
    expectTypeOf<DeepType<Document, 'nested.child.value'>>().toEqualTypeOf<
      number | null | undefined
    >();
  });
});
