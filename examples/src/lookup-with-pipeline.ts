import { aggregate } from '@gnoom/gnoom';

interface Order {
  _id: string;
  customerId: string;
  status: 'pending' | 'completed' | 'cancelled';
  items: { productId: string; quantity: number }[];
  createdAt: Date;
}

interface Product {
  _id: string;
  price: number;
  category: string;
}

const pipeline = aggregate<Order>()
  .$match({ status: 'completed' })
  .$unwind('$items')
  .$lookup<Product>()({
    from: 'products',
    let: { productId: '$items.productId' },
    pipeline: (p) =>
      p
        .$match({ $expr: { $eq: ['$_id', '$$productId'] } })
        .$project({ price: 1, category: 1 }),
    as: 'product'
  })
  .$unwind('$product')
  .$addFields({
    lineTotal: { $multiply: ['$items.quantity', '$product.price'] }
  })
  .$group({
    _id: '$customerId',
    totalSpent: { $sum: '$lineTotal' },
    categories: { $addToSet: '$product.category' }
  })
  .$match({ totalSpent: { $gt: 1000 } })
  .toArray();

console.log(JSON.stringify(pipeline, undefined, 2));
