import { expectTypeOf } from 'expect-type';
import { evaluate } from '../testing/evaluate';
import { InitialState } from '../types/aggregate-state';

describe('Field path expressions', () => {
  type Input = InitialState<{
    n: number;
    complex: 42 | true | 'hi';
    arrayOfArrays: {
      nestedArray: number[];
    }[];
    nested: {
      value: boolean;
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
    very: {
      deeply: {
        nested: {
          value: number;
        };
      };
    };
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
    const expression = evaluate<Input>()('$nested.value');

    expectTypeOf(expression).toEqualTypeOf<boolean>();
  });

  it('should support accessing properties of nullable nested objects', () => {
    const expression = evaluate<Input>()('$nullable.foo');

    expectTypeOf(expression).toEqualTypeOf<string | null>();
  });

  it('should support accessing properties of optional nested objects', () => {
    const expression = evaluate<Input>()('$optional.bar');

    expectTypeOf(expression).toEqualTypeOf<number | undefined>();
  });

  it('should evaluate to the correct type for nested arrays', () => {
    const expression = evaluate<Input>()('$arrayOfArrays.nestedArray');

    expectTypeOf(expression).toEqualTypeOf<number[][]>();
  });

  it('should evaluate to the correct type for an array of objects', () => {
    const expression = evaluate<Input>()('$arrayOfObjects.value');

    expectTypeOf(expression).toEqualTypeOf<number[]>();
  });

  it('should support partial paths', () => {
    const expression = evaluate<Input>()('$very.deeply');

    expectTypeOf(expression).toEqualTypeOf<{ nested: { value: number } }>();
  });
});
