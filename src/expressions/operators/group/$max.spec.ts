import { expectTypeOf } from 'expect-type';
import { evaluate } from '../../../testing/evaluate';
import { InitialState } from '../../../types/aggregate-state';
import { ObjectId, Timestamp, UUID } from 'mongodb';

describe('$max', () => {
  interface Input {
    array: number[];
  }

  it('should evaluate to a number when passing in a property', () => {
    const result = evaluate<InitialState<Input>>()({
      $max: '$array'
    });
    expectTypeOf(result).toEqualTypeOf<number>();
  });

  it('should evaluate to a number when passing in a constant', () => {
    const result = evaluate<InitialState<Input>>()({
      $max: [1, 2, 3]
    });
    expectTypeOf(result).toEqualTypeOf<number>();
  });

  it('should evaluate to a boolean when passing in a constant', () => {
    const result = evaluate<InitialState<Input>>()({
      $max: [true, true]
    });
    expectTypeOf(result).toEqualTypeOf<boolean>();
  });

  it('should evaluate to a string when passing in a constant', () => {
    const result = evaluate<InitialState<Input>>()({
      $max: ['what', 'is', 'max']
    });
    expectTypeOf(result).toEqualTypeOf<string>();
  });

  it('should evaluate to a Date', () => {
    const result = evaluate<InitialState<Input>>()({
      $max: [new Date(), new Date()]
    });
    expectTypeOf(result).toEqualTypeOf<Date>();
  });

  it('should evaluate to a Timestamp', () => {
    const result = evaluate<InitialState<Input>>()({
      $max: [new Timestamp(0n), new Timestamp(1n)]
    });
    expectTypeOf(result).toEqualTypeOf<Timestamp>();
  });

  it('should evaluate to an ObjectId', () => {
    const result = evaluate<InitialState<Input>>()({
      $max: [new ObjectId(), new ObjectId()]
    });
    expectTypeOf(result).toEqualTypeOf<ObjectId>();
  });

  it('should evaluate to a UUID', () => {
    const result = evaluate<InitialState<Input>>()({
      $max: [new UUID(), new UUID()]
    });
    expectTypeOf(result).toEqualTypeOf<UUID>();
  });
});
