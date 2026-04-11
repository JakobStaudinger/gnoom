import { Timestamp } from 'mongodb';

export interface TimestampOperatorMap {
  $tsIncrement: (timestamp: Timestamp) => number;
  $tsSecond: (timestamp: Timestamp) => number;
}
