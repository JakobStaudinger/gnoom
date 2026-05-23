import { expectTypeOf } from 'expect-type';
import { Timestamp } from 'mongodb';
import { evaluate } from '../testing/evaluate';
import { InitialState } from '../types/aggregate-state';
import { GnoomError } from '../types/error';

describe('Expressions', () => {
  describe('General', () => {
    type Input = InitialState<{
      n: number;
      s: string;
      nested: {
        b: boolean;
        n: number;
      };
    }>;

    it('should accept a constant expression', () => {
      const expression = evaluate<Input>()({ $abs: 42 });

      expectTypeOf(expression).toBeNumber();
    });

    it('should not accept a constant expression of a wrong type', () => {
      const expression = evaluate<Input>()({ $abs: true });

      expectTypeOf(expression).toExtend<
        GnoomError<{ message: 'Invalid arguments passed to operator "$abs"' }>
      >();
    });

    it('should accept a path that resolves to a number', () => {
      const expression = evaluate<Input>()({ $abs: '$n' });

      expectTypeOf(expression).toBeNumber();
    });

    it('should not accept a path that resolves to a wrong type', () => {
      const expression = evaluate<Input>()({ $abs: '$s' });

      expectTypeOf(expression).toExtend<
        GnoomError<{ message: 'Invalid arguments passed to operator "$abs"' }>
      >();
    });

    it('should accept a nested path that resolves to a number', () => {
      const expression = evaluate<Input>()({ $abs: '$nested.n' });

      expectTypeOf(expression).toBeNumber();
    });

    it('should accept nested expressions', () => {
      const expression = evaluate<Input>()({ $abs: { $add: [2, 3] } });

      expectTypeOf(expression).toBeNumber();
    });
  });

  describe('Static Input', () => {
    type Input = InitialState<{
      number: number;
      array: number[];
      string: string;
    }>;

    it('should allow literals', () => {
      const expression = evaluate<Input>()({ $sigmoid: { input: 12 } });

      expectTypeOf(expression).toBeNumber();
    });

    it('should not allow expressions', () => {
      type SpecializedInput = InitialState<{
        input: { input: number };
      }>;
      const expression = evaluate<SpecializedInput>()({ $sigmoid: '$input' });

      expectTypeOf(expression).toExtend<
        GnoomError<{
          message: 'Invalid arguments passed to operator "$sigmoid"';
        }>
      >();
    });

    it('should allow expressions for sub-fields', () => {
      const expression = evaluate<Input>()({
        $filter: {
          input: '$array',
          cond: true
        }
      });

      expectTypeOf(expression).toEqualTypeOf<number[]>();
    });

    it('should disallow expressions for sub-fields also marked static', () => {
      const expression = evaluate<Input>()({
        $filter: {
          input: '$array',
          as: '$string',
          cond: true
        }
      });

      expectTypeOf(expression).toExtend<
        GnoomError<{
          message: 'Invalid arguments passed to operator "$filter"';
        }>
      >();
    });

    it('should allow system variables', () => {
      const expression = evaluate<Input>()({
        root: '$$ROOT',
        current: '$$CURRENT',
        now: '$$NOW',
        time: '$$CLUSTER_TIME'
      });

      expectTypeOf(expression).toEqualTypeOf<{
        root: Input['T'];
        current: Input['T'];
        now: Date;
        time: Timestamp;
      }>();
    });
  });

  describe('Rest parameters', () => {
    type Input = InitialState<{
      number1: number;
      number2: number;
      number3: number;
      string: string;
    }>;

    it('should accept arbitrarily many parameters', () => {
      const expression = evaluate<Input>()({
        $add: ['$number1', '$number2', '$number3', 42, 69, '$number1']
      });

      expectTypeOf(expression).toBeNumber();
    });

    it('should require that all non-rest parameters are given', () => {
      const expression = evaluate<Input>()({
        $add: [1]
      });

      expectTypeOf(expression).toExtend<
        GnoomError<{ message: 'Invalid arguments passed to operator "$add"' }>
      >();
    });

    it('should be type-safe', () => {
      const expression = evaluate<Input>()({
        $add: ['$number1', '$number2', '$string']
      });

      expectTypeOf(expression).toExtend<
        GnoomError<{ message: 'Invalid arguments passed to operator "$add"' }>
      >();
    });
  });

  describe('operators with no parameters', () => {
    it('should take an empty object as its value', () => {
      const expression = evaluate()({ $rand: {} });

      expectTypeOf(expression).toBeNumber();
    });

    it('should not accept paths to an empty object', () => {
      type Input = InitialState<{
        empty: Record<string, never>;
      }>;

      const expression = evaluate<Input>()({ $rand: '$empty' });

      expectTypeOf(expression).toExtend<
        GnoomError<{ message: 'Invalid arguments passed to operator "$rand"' }>
      >();
    });
  });

  describe('Overloading', () => {
    type Input = InitialState<{
      date1: Date;
      date2: Date;
      number1: number;
      number2: number;
    }>;

    it('should add two numbers and result in a number', () => {
      const expression = evaluate<Input>()({
        $add: ['$number1', '$number2']
      });

      expectTypeOf(expression).toEqualTypeOf<number>();
    });

    it('should add a Date and a number and result in a Date', () => {
      const expression = evaluate<Input>()({
        $add: ['$date1', '$number2']
      });

      expectTypeOf(expression).toEqualTypeOf<Date>();
    });

    it('should subtract a number from a Date and return a Date', () => {
      const expression = evaluate<Input>()({
        $subtract: ['$date1', '$number1']
      });

      expectTypeOf(expression).toEqualTypeOf<Date>();
    });

    it('should subtract a Date from another Date and return a number', () => {
      const expression = evaluate<Input>()({
        $subtract: ['$date1', '$date2']
      });

      expectTypeOf(expression).toEqualTypeOf<number>();
    });

    it('should subtract a number from another number and return a number', () => {
      const expression = evaluate<Input>()({
        $subtract: ['$number1', '$number2']
      });

      expectTypeOf(expression).toEqualTypeOf<number>();
    });
  });
});
