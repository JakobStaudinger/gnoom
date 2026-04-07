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

  describe('Rest parameters', () => {
    type Input = {
      number1: number;
      number2: number;
      number3: number;
      string: string;
    };

    it('should accept arbitrarily many parameters', () => {
      const result = {
        $add: ['$number1', '$number2', '$number3', 42, 69, '$number1']
      } as const;
      expectTypeOf(result).toExtend<AggregateExpression<Input, number>>();
    });

    it('should be type-safe', () => {
      const result = {
        $add: ['$number1', '$number2', '$string']
      } as const;
      expectTypeOf(result).not.toExtend<AggregateExpression<Input, number>>();
    });
  });
});
