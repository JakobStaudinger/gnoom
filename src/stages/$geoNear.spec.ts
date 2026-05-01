import { expectTypeOf } from 'expect-type';
import { ObjectId } from 'mongodb';
import { aggregate } from '../aggregate';
import { ExtractDocumentType } from '../testing/extract-document-type';

describe('$geoNear', () => {
  describe('Output', () => {
    type InputDocument = {
      _id: ObjectId;
      n: number;
      s: string;
      b: boolean;
      location: {
        type: 'Point';
        coordinates: [number, number];
      };
    };

    it('should output the distance field', () => {
      const _result = aggregate<InputDocument>().$geoNear({
        near: {
          type: 'Point',
          coordinates: [16.3725, 48.2088]
        },
        distanceField: 'distanceToTarget'
      });
      type Result = ExtractDocumentType<typeof _result>;
      expectTypeOf<Result>().toExtend<{ distanceToTarget: number }>();
    });

    it('should output the includeLocs field', () => {
      const _result = aggregate<InputDocument>().$geoNear({
        near: {
          type: 'Point',
          coordinates: [16.3725, 48.2088]
        },
        distanceField: 'distanceToTarget',
        includeLocs: 'matchedLocation'
      });
      type Result = ExtractDocumentType<typeof _result>;
      expectTypeOf<Result>().toExtend<{ matchedLocation: unknown }>();
    });
  });
});
