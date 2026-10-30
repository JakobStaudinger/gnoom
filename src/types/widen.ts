import { ObjectId, Timestamp, UUID } from 'mongodb';

export type Widen<T> = [T] extends [Date]
  ? Date
  : [T] extends [Timestamp]
    ? Timestamp
    : [T] extends [UUID]
      ? UUID
      : [T] extends [ObjectId]
        ? ObjectId
        : T extends number
          ? number
          : T extends string
            ? string
            : T extends boolean
              ? boolean
              : T;
