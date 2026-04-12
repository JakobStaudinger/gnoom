import { expectTypeOf } from 'expect-type';
import { Aggregate, aggregate } from '../aggregate';

describe('$lookup', () => {
  describe('Output', () => {
    type Author = {
      name: string;
      age: number;
      numberOfBooksPublished: number;
    };

    type Book = {
      title: string;
      authorName: string;
    };

    type ExtractDocumentType<T> = T extends Aggregate<infer R> ? R : never;

    it('should add a property with the name specified in `as`', () => {
      const _result = aggregate<Book>().$lookup<Author>()({
        from: 'authors',
        localField: 'authorName',
        foreignField: 'name',
        as: 'author'
      });
      type Result = ExtractDocumentType<typeof _result>;
      expectTypeOf<keyof Result>()
        .exclude<keyof Book>()
        .toEqualTypeOf<'author'>();
    });

    it('should take the correct type as inferred by `pipeline`', () => {
      const _result = aggregate<Book>().$lookup<Author>()({
        from: 'authors',
        localField: 'authorName',
        foreignField: 'name',
        pipeline: aggregate<Author>().$project({ age: 0 }).toArray(),
        as: 'author'
      });

      type Result = ExtractDocumentType<typeof _result>['author'];
      expectTypeOf<Result>().toEqualTypeOf<Omit<Author, 'age'>[]>();
    });
  });
});
