import { aggregate } from '@gnoom/gnoom';

interface Measurement {
  _id: string;
  value: number;
}

const pipeline = aggregate<Measurement>()
  .$bucket({
    groupBy: '$value',
    boundaries: [0, 10, 20, 50, 100],
    default: 'other',
    output: {
      count: { $sum: 1 },
      avgValue: { $avg: '$value' }
    }
  })
  .toArray();

console.log(JSON.stringify(pipeline, undefined, 2));
