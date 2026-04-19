import { expectTypeOf } from 'expect-type';
import { EvaluateAggregateExpression } from './index';

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

    it('should accept a constant expression', () => {
      const _expression = { $abs: 42 } as const;

      type Result = EvaluateAggregateExpression<Input, typeof _expression>;

      expectTypeOf<Result>().toBeNumber();
    });

    it('should not accept a constant expression of a wrong type', () => {
      const _expression = { $abs: true } as const;

      type Result = EvaluateAggregateExpression<Input, typeof _expression>;

      expectTypeOf<Result>().toBeNever();
    });

    it('should accept a path that resolves to a number', () => {
      const _expression = { $abs: '$n' } as const;

      type Result = EvaluateAggregateExpression<Input, typeof _expression>;

      expectTypeOf<Result>().toBeNumber();
    });

    it('should not accept a path that resolves to a wrong type', () => {
      const _expression = { $abs: '$s' } as const;

      type Result = EvaluateAggregateExpression<Input, typeof _expression>;

      expectTypeOf<Result>().not.toExtend<number>();
    });

    it('should accept a nested path that resolves to a number', () => {
      const _expression = { $abs: '$nested.n' } as const;

      type Result = EvaluateAggregateExpression<Input, typeof _expression>;

      expectTypeOf<Result>().toExtend<number>();
    });

    it('should accept nested expressions', () => {
      const _expression = { $abs: { $add: [2, 3] } } as const;

      type Result = EvaluateAggregateExpression<Input, typeof _expression>;

      expectTypeOf<Result>().toExtend<number>();
    });
  });

  describe('Static Input', () => {
    type Input = {
      number: number;
      array: number[];
      string: string;
    };

    it('should allow literals', () => {
      const _expression = {
        $sigmoid: { input: 12 }
      } as const;

      type Result = EvaluateAggregateExpression<Input, typeof _expression>;

      expectTypeOf<Result>().toExtend<number>();
    });

    it('should not allow expressions', () => {
      type SpecializedInput = {
        input: { input: number };
      };
      const _expression = { $sigmoid: '$input' } as const;

      type Result = EvaluateAggregateExpression<
        SpecializedInput,
        typeof _expression
      >;

      expectTypeOf<Result>().toBeNever();
    });

    it('should allow expressions for sub-fields', () => {
      const _expression = {
        $filter: {
          input: '$array',
          cond: true
        }
      } as const;

      type Result = EvaluateAggregateExpression<Input, typeof _expression>;

      // TODO: should be `number[]` but generics get lost
      expectTypeOf<Result>().toEqualTypeOf<unknown[]>();
    });

    /*
      TODO: TS cannot represent a type that is "any string that doesn't start with '$'"
      so strings that are actually field paths are interpreted as literal strings
    */
    // it.skip('should disallow expressions for sub-fields also marked static', () => {
    //   const _expression = {
    //     $filter: {
    //       input: '$array',
    //       as: '$string',
    //       cond: true
    //     }
    //   } as const;

    //   type Result = EvaluateAggregateExpression<Input, typeof _expression>;

    //   expectTypeOf<Result>().toBeNever();
    // });
  });

  describe('Rest parameters', () => {
    type Input = {
      number1: number;
      number2: number;
      number3: number;
      string: string;
    };

    it('should accept arbitrarily many parameters', () => {
      const _expression = {
        $add: ['$number1', '$number2', '$number3', 42, 69, '$number1']
      } as const;

      type Result = EvaluateAggregateExpression<Input, typeof _expression>;

      expectTypeOf<Result>().toBeNumber();
    });

    it('should require that all non-rest parameters are given', () => {
      const _expression = {
        $add: [1]
      } as const;

      type Result = EvaluateAggregateExpression<Input, typeof _expression>;

      expectTypeOf<Result>().toBeNever();
    });

    it('should be type-safe', () => {
      const _expression = {
        $add: ['$number1', '$number2', '$string']
      } as const;

      type Result = EvaluateAggregateExpression<Input, typeof _expression>;

      expectTypeOf<Result>().toBeNever();
    });
  });

  describe('operators with no parameters', () => {
    it('should take an empty object as its value', () => {
      const _expression = { $rand: {} } as const;

      type Result = EvaluateAggregateExpression<object, typeof _expression>;

      expectTypeOf<Result>().toBeNumber();
    });

    it('should not accept paths to an empty object', () => {
      type Input = {
        empty: Record<string, never>;
      };

      const _expression = { $rand: '$empty' } as const;

      type Result = EvaluateAggregateExpression<Input, typeof _expression>;

      expectTypeOf<Result>().toBeNever();
    });
  });

  describe('Overloading', () => {
    type Input = {
      date1: Date;
      date2: Date;
      number1: number;
      number2: number;
    };

    it('should add two numbers and result in a number', () => {
      const _expression = {
        $add: ['$number1', '$number2']
      } as const;

      type Result = EvaluateAggregateExpression<Input, typeof _expression>;

      expectTypeOf<Result>().toBeNumber();
    });

    it('should add a Date and a number and result in a Date', () => {
      const _expression = {
        $add: ['$date1', '$number2']
      } as const;

      type Result = EvaluateAggregateExpression<Input, typeof _expression>;

      expectTypeOf<Result>().toEqualTypeOf<Date>();
    });

    it('should subtract a number from a Date and return a Date', () => {
      const _expression = {
        $subtract: ['$date1', '$number1']
      } as const;

      type Result = EvaluateAggregateExpression<Input, typeof _expression>;

      expectTypeOf<Result>().toEqualTypeOf<Date>();
    });

    it('should subtract a Date from another Date and return a number', () => {
      const _expression = {
        $subtract: ['$date1', '$date2']
      } as const;

      type Result = EvaluateAggregateExpression<Input, typeof _expression>;

      expectTypeOf<Result>().toBeNumber();
    });
  });
});
