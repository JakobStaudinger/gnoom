import { expectTypeOf } from 'expect-type';
import { ObjectId } from 'mongodb';
import { aggregate } from '../aggregate';
import { ExtractDocumentType } from '../testing/extract-document-type';
import { GnoomError } from '../types/error';

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

    it('should be an error when not the first stage', () => {
      const error: GnoomError<{
        message: 'Must be the first stage in a pipeline';
      }> = null!;

      aggregate<InputDocument>().$match({}).$geoNear(error);
    });
  });
});
