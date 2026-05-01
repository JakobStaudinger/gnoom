import { expectTypeOf } from 'expect-type';
import { aggregate } from '../aggregate';
import { ExtractDocumentType } from '../testing/extract-document-type';

describe('$unionWith', () => {
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
