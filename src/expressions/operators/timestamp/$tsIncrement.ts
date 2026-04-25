import { Timestamp } from 'mongodb';

export interface $tsIncrement {
  $tsIncrement: (timestamp: Timestamp) => number;
}
