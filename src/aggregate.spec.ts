import { expectTypeOf } from 'expect-type';
import { aggregate } from './aggregate';
import {
  ExtractDocumentType,
  ExtractState
} from './testing/extract-document-type';

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

  describe('with', () => {
    it('should combine the types of all variants', () => {
      const _output = aggregate<{ foo: string }>().with((p) => {
        const x = Math.floor(Math.random() * 3);
        switch (x) {
          case 0:
            return p.$replaceWith({ foo: 'string' as string });
          case 1:
            return p.$replaceWith({
              foo: { $rand: {} },
              bar: true as boolean
            });
          default:
            return p.$replaceWith({
              foo: 'string' as string,
              bar: { $lt: [{ $rand: {} }, 0.5] },
              baz: { $rand: {} }
            });
        }
      });

      type Result = ExtractDocumentType<typeof _output>;
      expectTypeOf<Result>().toEqualTypeOf<{
        foo: string | number;
        bar?: boolean;
        baz?: number;
      }>();
    });

    it('should correctly set hasStage to false', () => {
      const _output = aggregate().with((p) => {
        if (Math.random() > 0.5) {
          return p;
        } else {
          return aggregate();
        }
      });

      type Result = ExtractState<typeof _output>;

      expectTypeOf<Result['hasStage']>().toEqualTypeOf<false>();
    });

    it('should set hasStage to true if any of the variants has a stage', () => {
      const _output = aggregate().with((p) => {
        if (Math.random() > 0.5) {
          return p.$match({});
        } else {
          return p;
        }
      });

      type Result = ExtractState<typeof _output>;

      expectTypeOf<Result['hasStage']>().toEqualTypeOf<true>();
    });

    it('should correctly set finalStage to never', () => {
      const _output = aggregate().with((p) => {
        if (Math.random() > 0.5) {
          return p.$match({});
        } else {
          return p;
        }
      });

      type Result = ExtractState<typeof _output>;

      expectTypeOf<Result['finalStage']>().toBeNever();
    });

    it('should set finalStage to the correct value when any of the branches finalize', () => {
      const _output = aggregate().with((p) => {
        const x = Math.floor(Math.random() * 3);
        switch (x) {
          case 0:
            return p.$out()('test');
          case 1:
            return p.$merge()('test');
          default:
            return p;
        }
      });

      type Result = ExtractState<typeof _output>;

      expectTypeOf<Result['finalStage']>().toEqualTypeOf<'$out' | '$merge'>();
    });
  });
});
