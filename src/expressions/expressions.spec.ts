import { expectTypeOf } from 'expect-type';
import { AggregateExpression } from './index';

describe('Expressions', () => {
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

  it('should not accept a path that resolves to a string', () => {
    const result = { $abs: '$s' } as const;
    expectTypeOf(result).not.toExtend<AggregateExpression<Input, number>>();
  });

  it('should accept a nested path that resolves to a number', () => {
    const result = { $abs: '$nested.n' } as const;
    expectTypeOf(result).toExtend<AggregateExpression<Input, number>>();
  });

  it('should accept another expression', () => {
    const result = { $abs: { $add: [2, 3] } } as const;
    expectTypeOf(result).toExtend<AggregateExpression<Input, number>>();
  });
});
