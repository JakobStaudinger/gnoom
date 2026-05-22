import { aggregate } from '@gnoom/gnoom';
import { MongoClient } from 'mongodb';
import { ObjectId } from 'mongodb';

interface Order {
  _id: ObjectId;
  customerId: ObjectId;
  status: 'pending' | 'completed';
  items: {
    productId: ObjectId;
    quantity: number;
    unitPrice: number;
  }[];
  createdAt: Date;
}

interface CustomerRevenueSummary {
  customerId: ObjectId;
  updatedAt: Date;
  totalRevenue: number;
  totalItemsSold: number;
  lastPurchaseAt: Date;
}

declare const client: MongoClient;

aggregate<Order>()
  .$match({
    status: 'completed',
    createdAt: {
      $gte: new Date('2025-01-01')
    }
  })
  .$unwind('$items')
  .$group({
    _id: '$customerId',
    totalRevenue: {
      $sum: {
        $multiply: ['$items.quantity', '$items.unitPrice']
      }
    },
    totalItemsSold: {
      $sum: '$items.quantity'
    },
    lastPurchaseAt: {
      $max: '$createdAt'
    }
  })
  .$set({
    customerId: '$_id',
    updatedAt: '$$NOW'
  })
  .$unset('_id')
  .$merge<CustomerRevenueSummary>()({
    into: 'customerRevenueSummary',
    on: 'customerId',
    whenMatched: 'merge',
    whenNotMatched: 'insert'
  })
  .execute(client.db('Test').collection('orders'));
