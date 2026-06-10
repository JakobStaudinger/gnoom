import { aggregate } from '@gnoom/gnoom';
import { ObjectId } from 'mongodb';

interface Restaurant {
  _id: ObjectId;
  name: string;
  rating: number;
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
}

const pipeline = aggregate<Restaurant>()
  .$rankFusion({
    input: {
      pipelines: {
        nearest: (p) =>
          p.$geoNear({
            near: { type: 'Point', coordinates: [-73.9857, 40.7484] },
            key: 'location',
            spherical: true
          }),
        highestRated: (p) =>
          p.$sort({
            rating: -1,
            _id: 1
          })
      }
    },
    combination: {
      weights: {
        nearest: 2,
        highestRated: 1
      }
    },
    scoreDetails: true
  })
  .toArray();

console.log(JSON.stringify(pipeline, undefined, 2));
