import { Timestamp } from 'mongodb';

export interface $tsSecond {
  $tsSecond: (timestamp: Timestamp) => number;
}
