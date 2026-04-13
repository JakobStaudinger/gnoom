import { aggregate } from '@gnoom/gnoom';

interface Order {
  _id: string;
  customerId: string;
  items: { productId: string; price: number; quantity: number }[];
  createdAt: Date;
}

interface Customer {
  _id: string;
  name: string;
  country: string;
}

const pipeline = aggregate<Order>()
  .$match({ createdAt: { $gte: new Date('2025-01-01') } })
  .$unwind('$items')
  .$group({
    _id: '$_id',
    customerId: { $first: '$customerId' },
    total: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
  })
  .$lookup<Customer>()({
    from: 'customers',
    localField: 'customerId',
    foreignField: '_id',
    pipeline: (p) => p.$project({ name: 0 }).toArray(),
    as: 'customer'
  })
  .$unwind('$customer')
  .$match({ 'customer.country': 'AT' })
  .$sort({ total: -1 })
  .toArray();

console.log(JSON.stringify(pipeline, undefined, 2));
