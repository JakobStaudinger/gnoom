import { aggregate } from '@gnoom/gnoom';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

interface Post {
  _id: string;
  authorId: string;
  title: string;
  published: boolean;
  createdAt: Date;
}

const includeAuthorDetails = Math.random() > 0.5;

const pipeline = aggregate<Post>()
  .$match({ published: true })
  .with((p) => {
    if (includeAuthorDetails) {
      return p
        .$lookup<User>()({
          from: 'users',
          localField: 'authorId',
          foreignField: '_id',
          as: 'author'
        })
        .$unwind('$author')
        .$project({
          title: 1,
          createdAt: 1,
          author: {
            _id: '$author._id',
            name: '$author.name',
            email: '$author.email'
          }
        });
    }

    return p.$project({
      title: 1,
      createdAt: 1,
      authorId: 1
    });
  })
  .$sort({ createdAt: -1 })
  .toArray();

console.log(JSON.stringify(pipeline, undefined, 2));
