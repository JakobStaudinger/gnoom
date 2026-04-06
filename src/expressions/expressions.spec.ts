import { expectTypeOf } from 'expect-type';
import { AggregateExpression } from './index';

describe('Expressions', () => {
  describe('General', () => {
    type Input = {
      n: number;
      s: string;
      nested: {
        b: boolean;
        n: number;
      };
    };

    it('should accept a literal', () => {
      const result = { $abs: 42 } as const;
      expectTypeOf(result).toExtend<AggregateExpression<Input, number>>();
    });

    it('should not accept a literal of a wrong type', () => {
      const result = { $abs: true } as const;
      expectTypeOf(result).not.toExtend<AggregateExpression<Input, number>>();
    });

    it('should accept a path that resolves to a number', () => {
      const result = { $abs: '$n' } as const;
      expectTypeOf(result).toExtend<AggregateExpression<Input, number>>();
    });

    it('should not accept a path that resolves to a wrong type', () => {
      const result = { $abs: '$s' } as const;
      expectTypeOf(result).not.toExtend<AggregateExpression<Input, number>>();
    });

    it('should accept a nested path that resolves to a number', () => {
      const result = { $abs: '$nested.n' } as const;
      expectTypeOf(result).toExtend<AggregateExpression<Input, number>>();
    });

    it('should accept nested expressions', () => {
      const result = { $abs: { $add: [2, 3] } } as const;
      expectTypeOf(result).toExtend<AggregateExpression<Input, number>>();
    });
  });

  describe('Static Input', () => {
    type Input = {
      foo: number;
    };

    it('should allow literals', () => {
      const result = {
        $sigmoid: { input: 12 }
      } as const;
      expectTypeOf(result).toExtend<AggregateExpression<Input, number>>();
    });

    it('should not allow expressions', () => {
      type SpecializedInput = {
        input: { input: number };
      };
      const result = { $sigmoid: '$input' } as const;
      expectTypeOf(result).not.toExtend<
        AggregateExpression<SpecializedInput, number>
      >();
    });
  });
});
