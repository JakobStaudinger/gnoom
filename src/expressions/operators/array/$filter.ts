import { ObjectId, Timestamp } from 'mongodb';
import { StaticInput } from '../../static-input';

export interface $filter {
  $filter:
    | ((input: FilterInput<number>) => number[])
    | ((input: FilterInput<string>) => string[])
    | ((input: FilterInput<boolean>) => boolean[])
    | ((input: FilterInput<Date>) => Date[])
    | ((input: FilterInput<ObjectId>) => ObjectId[])
    | ((input: FilterInput<Timestamp>) => Timestamp[])
    | (<T extends object>(input: FilterInput<T>) => T[]);
}

type FilterInput<T> = StaticInput<{
  input: T[];
  as?: StaticInput<string>;
  cond: boolean;
  limit?: number;
}>;
