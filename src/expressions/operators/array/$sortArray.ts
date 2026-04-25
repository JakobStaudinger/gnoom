import { StaticInput } from '../../static-input';

export interface $sortArray {
  $sortArray: <T>(
    input: StaticInput<{ input: T[]; sortBy: object | number }>
  ) => T[];
}
