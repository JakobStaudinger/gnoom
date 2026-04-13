import { aggregate } from '@gnoom/gnoom';

interface Post {
  _id: string;
  title: string;
  tags: string[];
  published: boolean;
}

const pipeline = aggregate<Post>()
  .$match({ published: true })
  .$unwind('$tags')
  .$group({
    _id: '$tags',
    count: { $sum: 1 }
  })
  .$sort({ count: -1 })
  .$limit(5)
  .toArray();

console.log(JSON.stringify(pipeline, undefined, 2));
