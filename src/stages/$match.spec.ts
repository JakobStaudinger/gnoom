import { aggregate } from '../aggregate';

type Test = {
  foo: string | null;
  bar: number | null;
  baz: number[];
};

describe('$match', () => {
  it('should do type narrowing', () => {
    aggregate<Test>()
      .$match({
        foo: { $ne: null }
      })
      .$match({
        // @ts-expect-error `foo` is narrowed to type `string` because of the check above
        foo: { $eq: null }
      });
  });
});
