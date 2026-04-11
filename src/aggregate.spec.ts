import { aggregate } from './aggregate';

describe('AggregateBuilder', () => {
  it('should produce an array as output', () => {
    expect(aggregate().toArray()).toEqual([]);
  });

  it('should add stages for each function call', () => {
    type Test = {
      foo: string;
      bar: number;
    };

    const output = aggregate<Test>()
      .$match({ foo: '42', bar: 42 })
      .$match({ bar: 42 })
      .$match({ foo: '42' })
      .toArray();

    expect(output).toEqual([
      { $match: { foo: '42', bar: 42 } },
      { $match: { bar: 42 } },
      { $match: { foo: '42' } }
    ]);
  });

  it('should allow "custom" pipeline stages that are untyped', () => {
    const output = aggregate()
      .custom({ $foo: { mySpec: 42 } })
      .toArray();
    expect(output).toEqual([{ $foo: { mySpec: 42 } }]);
  });

  it('should prefer the specific types over the fallback', () => {
    type Test = {
      foo: string;
    };

    const output = aggregate<Test>()
      .$match({ foo: '42' })
      // @ts-expect-error bar does not exist in `Test` so it should disallow filtering for it
      .$match({ bar: 42 })
      .toArray();

    expect(output).toEqual([
      { $match: { foo: '42' } },
      { $match: { bar: 42 } }
    ]);
  });
});
