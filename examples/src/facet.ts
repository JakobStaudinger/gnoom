import { aggregate } from '@gnoom/gnoom';

interface Transaction {
  _id: string;
  userId: string;
  amount: number;
  status: 'success' | 'failed';
  createdAt: Date;
}

const pipeline = aggregate<Transaction>()
  .$match({ status: 'success' })
  .$facet({
    data: (p) => p.$sort({ createdAt: -1 }).$skip(20).$limit(10),
    totalCount: (p) => p.$count('count'),
    stats: (p) =>
      p.$group({
        _id: null,
        totalAmount: { $sum: '$amount' },
        avgAmount: { $avg: '$amount' }
      })
  })
  .toArray();

console.log(JSON.stringify(pipeline, undefined, 2));
