import { aggregate } from '@gnoom/gnoom';

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
}

const pipeline = aggregate<Product>()
  .$addFields({
    discountedPrice: {
      $cond: [
        { $eq: ['$category', 'electronics'] },
        { $multiply: ['$price', 0.9] },
        '$price'
      ]
    }
  })
  .$match({ discountedPrice: { $lt: 500 } })
  .toArray();

console.log(JSON.stringify(pipeline, undefined, 2));
