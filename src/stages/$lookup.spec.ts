import { expectTypeOf } from 'expect-type';
import { aggregate } from '../aggregate';
import { ExtractDocumentType } from '../testing/extract-document-type';

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
        pipeline: (p) => p.$project({ age: 0 }).toArray(),
        as: 'author'
      });

      type Result = ExtractDocumentType<typeof _result>['author'];
      expectTypeOf<Result>().toEqualTypeOf<Omit<Author, 'age'>[]>();
    });
  });
});
