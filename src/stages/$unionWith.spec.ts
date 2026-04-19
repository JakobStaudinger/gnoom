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

    it('should result in T | Other', () => {
      const _result = aggregate<Book>().$unionWith<Author>()({
        coll: 'authors',
        pipeline: (p) => p
      });
      type Result = ExtractDocumentType<typeof _result>;
      expectTypeOf<Result>().toEqualTypeOf<Book | Author>();
    });

    it('should consider the actual type of the pipeline', () => {
      const _result = aggregate<Book>().$unionWith<Author>()({
        coll: 'authors',
        pipeline: (p) => p.$replaceWith({ random: { $rand: {} } })
      });
      type Result = ExtractDocumentType<typeof _result>;
      expectTypeOf<Result>().toEqualTypeOf<Book | { random: number }>();
    });
  });
});
