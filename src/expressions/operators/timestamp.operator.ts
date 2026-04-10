import { Timestamp } from 'mongodb';

export type TimestampOperator =
  | { $tsIncrement: (timestamp: Timestamp) => number }
  | { $tsSecond: (timestamp: Timestamp) => number };
