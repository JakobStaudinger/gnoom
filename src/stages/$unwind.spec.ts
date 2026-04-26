import { ObjectId } from 'mongodb';
import { Aggregate, aggregate } from '../aggregate';
import { expectTypeOf } from 'expect-type';

describe('$unwind', () => {
  describe('Output', () => {
    type ExtractDocumentType<T> = T extends Aggregate<infer R> ? R : never;

    type InputDocument = {
      _id: ObjectId;
      array: number[];
      nonArray: string;
      nullable: boolean | null;
      nested: {
        property: string[];
        unaffected: number[];
      };
    };

    it('should unwind an array', () => {
      const _result = aggregate<InputDocument>().$unwind('$array');
      type Result = ExtractDocumentType<typeof _result>['array'];
      expectTypeOf<Result>().toEqualTypeOf<number>();
    });

    it('should unwind an array and keep nulls', () => {
      const _result = aggregate<InputDocument>().$unwind({
        path: '$array',
        preserveNullAndEmptyArrays: true
      });
      type Result = ExtractDocumentType<typeof _result>['array'];
      expectTypeOf<Result>().toEqualTypeOf<number | null>();
    });

    it('should "unwind" a non-array', () => {
      const _result = aggregate<InputDocument>().$unwind('$nonArray');
      type Result = ExtractDocumentType<typeof _result>['nonArray'];
      expectTypeOf<Result>().toEqualTypeOf<string>();
    });

    it('should "unwind" a non-array and keep nulls', () => {
      const _result = aggregate<InputDocument>().$unwind({
        path: '$nonArray',
        preserveNullAndEmptyArrays: true
      });
      type Result = ExtractDocumentType<typeof _result>['nonArray'];
      expectTypeOf<Result>().toExtend<string>();
    });

    it('should remove null from the type if preserveNullAndEmptyArrays is false', () => {
      const _result = aggregate<InputDocument>().$unwind('$nullable');
      type Result = ExtractDocumentType<typeof _result>['nullable'];
      expectTypeOf<Result>().toEqualTypeOf<boolean>();
    });

    it('should not remove null from the type if preserveNullAndEmptyArrays is true', () => {
      const _result = aggregate<InputDocument>().$unwind({
        path: '$nullable',
        preserveNullAndEmptyArrays: true
      });
      type Result = ExtractDocumentType<typeof _result>['nullable'];
      expectTypeOf<Result>().toEqualTypeOf<boolean | null>();
    });

    it('should add an array index property with the given name', () => {
      const _result = aggregate<InputDocument>().$unwind({
        path: '$array',
        includeArrayIndex: 'arrayIndex'
      });
      type Result = ExtractDocumentType<typeof _result>;
      expectTypeOf<Result['array']>().toEqualTypeOf<number>();
      expectTypeOf<Result['arrayIndex']>().toEqualTypeOf<number>();
    });

    it('should unwind a nested property', () => {
      const _result = aggregate<InputDocument>().$unwind({
        path: '$nested.property',
        preserveNullAndEmptyArrays: false
      });
      type Result = ExtractDocumentType<typeof _result>;
      expectTypeOf<Result['nested']>().toEqualTypeOf<{
        property: string;
        unaffected: number[];
      }>();
    });
  });
});
