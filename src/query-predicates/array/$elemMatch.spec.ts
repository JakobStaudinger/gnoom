import { expectQueryPredicate } from '../../testing/expect-query-predicate';
import { InitialState } from '../../types/aggregate-state';

describe('$elemMatch', () => {
  describe('Simple arrays', () => {
    interface Input {
      numbers: number[];
      nullableArray?: string[] | null;
    }

    it('should disallow literal values', () => {
      expectQueryPredicate<InitialState<Input>>()({
        numbers: { $elemMatch: 5 }
      }).toBeInvalid();
    });

    it('should allow operators', () => {
      expectQueryPredicate<InitialState<Input>>()({
        numbers: { $elemMatch: { $gt: 2, $lt: 6 } }
      }).toBeValid();
    });

    it('should work with nullable arrays', () => {
      expectQueryPredicate<InitialState<Input>>()({
        nullableArray: { $elemMatch: { $in: ['hello', 'world'] } }
      }).toBeValid();
    });

    it("should not work if the types don't match the operators", () => {
      expectQueryPredicate<InitialState<Input>>()({
        numbers: { $elemMatch: { $in: ['hello', 'world'] } }
      }).toBeInvalid();
    });
  });

  describe('Embedded documents', () => {
    interface Input {
      people: {
        firstName: string;
        lastName: string;
        age: number;
      }[];
      nullable?:
        | {
            date: Date;
            value: number;
          }[]
        | null;
    }

    it('should allow nested query predicates', () => {
      expectQueryPredicate<InitialState<Input>>()({
        people: { $elemMatch: { age: { $gte: 18 } } }
      }).toBeValid();
    });

    it('should allow nested query predicates on nullable arrays', () => {
      expectQueryPredicate<InitialState<Input>>()({
        nullable: { $elemMatch: { date: { $gt: new Date('2026-01-01') } } }
      }).toBeValid();
    });
  });
});
