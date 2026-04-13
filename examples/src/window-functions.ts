import { aggregate } from '@gnoom/gnoom';

interface Score {
  _id: string;
  userId: string;
  gameId: string;
  score: number;
  createdAt: Date;
}

const pipeline = aggregate<Score>()
  .$setWindowFields({
    partitionBy: '$gameId',
    sortBy: { score: -1 },
    output: {
      rank: { $rank: {} },
      topScore: { $first: '$score' }
    }
  })
  .$match({ rank: { $lte: 3 } })
  .toArray();

console.log(JSON.stringify(pipeline, undefined, 2));
