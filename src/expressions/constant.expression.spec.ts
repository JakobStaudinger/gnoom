import { expectTypeOf } from 'expect-type';
import { ObjectId, Timestamp, UUID } from 'mongodb';
import { evaluate } from '../testing/evaluate';

describe('Constant expressions', () => {
  it('should accept a number', () => {
    const expression = evaluate()(42);

    expectTypeOf(expression).toBeNumber();
  });

  it('should accept a string', () => {
    const expression = evaluate()('hello');

    expectTypeOf(expression).toBeString();
  });

  it('should accept a boolean', () => {
    const expression = evaluate()(true);

    expectTypeOf(expression).toBeBoolean();
  });

  it('should accept an ObjectId', () => {
    const expression = evaluate()(new ObjectId());

    expectTypeOf(expression).toEqualTypeOf<ObjectId>();
  });

  it('should accept a UUID', () => {
    const expression = evaluate()(new UUID());

    expectTypeOf(expression).toEqualTypeOf<UUID>();
  });

  it('should accept a Date', () => {
    const expression = evaluate()(new Date());

    expectTypeOf(expression).toEqualTypeOf<Date>();
  });

  it('should accept a Timestamp', () => {
    const expression = evaluate()(new Timestamp(1n));

    expectTypeOf(expression).toEqualTypeOf<Timestamp>();
  });

  it('should accept an arbitrary object', () => {
    const expression = evaluate()({ hello: 'world' });

    expectTypeOf(expression).toBeObject();
  });

  it('should accept an array', () => {
    const expression = evaluate()(['hello', 1, true]);

    expectTypeOf(expression).toBeArray();
  });

  it('should evaluate nested expressions', () => {
    const expression = evaluate()({
      greeting: { $concat: ['hello', ' ', ' world'] }
    });

    expectTypeOf(expression).toEqualTypeOf<{ greeting: string }>();
  });
});
