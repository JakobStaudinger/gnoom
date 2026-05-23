import { expectTypeOf } from 'expect-type';
import { evaluate } from '../testing/evaluate';
import { InitialState } from '../types/aggregate-state';

describe('Field path expressions', () => {
  type Input = InitialState<{
    n: number;
    complex: 42 | true | 'hi';
    nested: {
      array: { value: number; name: string }[];
    };
    nullable: {
      foo: string;
    } | null;
    optional?: {
      bar: number;
    };
    arrayOfObjects: {
      value: number;
    }[];
  }>;

  it('should evaluate to the type of the property', () => {
    const expression = evaluate<Input>()('$n');

    expectTypeOf(expression).toBeNumber();
  });

  it('should retain the exact type of the property', () => {
    const expression = evaluate<Input>()('$complex');

    expectTypeOf(expression).toEqualTypeOf<42 | true | 'hi'>();
  });

  it('should support nested property access', () => {
    const expression = evaluate<Input>()('$nested.array.value');

    expectTypeOf(expression).toEqualTypeOf<number[]>();
  });

  it('should support accessing properties of nullable nested objects', () => {
    const expression = evaluate<Input>()('$nullable.foo');

    expectTypeOf(expression).toEqualTypeOf<string | null>();
  });

  it('should support accessing properties of optional nested objects', () => {
    const expression = evaluate<Input>()('$optional.bar');

    expectTypeOf(expression).toEqualTypeOf<number | undefined>();
  });
});
