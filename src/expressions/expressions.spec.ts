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
      const expression = { $abs: 42 } as const;
      expectTypeOf(expression).toExtend<AggregateExpression<Input, number>>();
    });

    it('should not accept a literal of a wrong type', () => {
      const expression = { $abs: true } as const;
      expectTypeOf(expression).not.toExtend<
        AggregateExpression<Input, number>
      >();
    });

    it('should accept a path that resolves to a number', () => {
      const expression = { $abs: '$n' } as const;
      expectTypeOf(expression).toExtend<AggregateExpression<Input, number>>();
    });

    it('should not accept a path that resolves to a wrong type', () => {
      const expression = { $abs: '$s' } as const;
      expectTypeOf(expression).not.toExtend<
        AggregateExpression<Input, number>
      >();
    });

    it('should accept a nested path that resolves to a number', () => {
      const expression = { $abs: '$nested.n' } as const;
      expectTypeOf(expression).toExtend<AggregateExpression<Input, number>>();
    });

    it('should accept nested expressions', () => {
      const expression = { $abs: { $add: [2, 3] } } as const;
      expectTypeOf(expression).toExtend<AggregateExpression<Input, number>>();
    });
  });

  describe('Static Input', () => {
    type Input = {
      number: number;
      array: number[];
      string: string;
    };

    it('should allow literals', () => {
      const expression = {
        $sigmoid: { input: 12 }
      } as const;
      expectTypeOf(expression).toExtend<AggregateExpression<Input, number>>();
    });

    it('should not allow expressions', () => {
      type SpecializedInput = {
        input: { input: number };
      };
      const expression = { $sigmoid: '$input' } as const;
      expectTypeOf(expression).not.toExtend<
        AggregateExpression<SpecializedInput, number>
      >();
    });

    it('should allow expressions for sub-fields', () => {
      const expression = {
        $filter: {
          input: '$array',
          cond: true
        }
      } as const;

      expectTypeOf(expression).toExtend<
        AggregateExpression<Input, unknown[]>
      >();
    });

    /*
      TODO: TS cannot represent a type that is "any string that doesn't start with '$'"
      so strings that are actually field paths are interpreted as literal strings
    */
    // it.skip('should disallow expressions for sub-fields also marked static', () => {
    //   const expression = {
    //     $filter: {
    //       input: '$array',
    //       as: '$string',
    //       cond: true
    //     }
    //   } as const;

    //   expectTypeOf(expression).not.toExtend<
    //     AggregateExpression<Input, unknown[]>
    //   >();
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
      const expression = {
        $add: ['$number1', '$number2', '$number3', 42, 69, '$number1']
      } as const;
      expectTypeOf(expression).toExtend<AggregateExpression<Input, number>>();
    });

    it('should be type-safe', () => {
      const expression = {
        $add: ['$number1', '$number2', '$string']
      } as const;
      expectTypeOf(expression).not.toExtend<
        AggregateExpression<Input, number>
      >();
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
      const expression = {
        $add: ['$number1', '$number2']
      } as const;
      expectTypeOf(expression).toExtend<AggregateExpression<Input, number>>();
    });

    it('should add a Date and a number and result in a Date', () => {
      const expression = {
        $add: ['$date1', '$number2']
      } as const;
      expectTypeOf(expression).toExtend<AggregateExpression<Input, Date>>();
    });

    it('should subtract a number from a Date and return a Date', () => {
      const expression = {
        $subtract: ['$date1', '$number1']
      } as const;
      expectTypeOf(expression).toExtend<AggregateExpression<Input, Date>>();
    });

    it('should subtract a Date from another Date and return a number', () => {
      const expression = {
        $subtract: ['$date1', '$date2']
      } as const;
      expectTypeOf(expression).toExtend<AggregateExpression<Input, number>>();
    });
  });
});
