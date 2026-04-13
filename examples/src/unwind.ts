import { aggregate } from '@gnoom/gnoom';

interface User {
  _id: string;
  email: string;
  activities: {
    type: 'login' | 'purchase';
    createdAt: Date;
    metadata?: Record<string, unknown>;
  }[];
}

const pipeline = aggregate<User>()
  .$unwind('$activities')
  .$match({
    'activities.type': 'purchase',
    'activities.createdAt': { $gte: new Date('2025-01-01') }
  })
  .$project({
    email: 1,
    purchaseDate: '$activities.createdAt',
    metadata: '$activities.metadata'
  })
  .toArray();

console.log(JSON.stringify(pipeline, undefined, 2));
