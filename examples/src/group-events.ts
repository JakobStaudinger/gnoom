import { aggregate } from '@gnoom/gnoom';

interface Event {
  _id: string;
  type: string;
  createdAt: Date;
}

const pipeline = aggregate<Event>()
  .$group({
    _id: {
      day: { $dayOfMonth: '$createdAt' },
      month: { $month: '$createdAt' },
      year: { $year: '$createdAt' }
    },
    count: { $sum: 1 }
  })
  .$sort({ '_id.year': -1, '_id.month': -1, '_id.day': -1 })
  .toArray();

console.log(JSON.stringify(pipeline, undefined, 2));
