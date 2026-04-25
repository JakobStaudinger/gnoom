import { StaticInput } from '../expressions/static-input';

export interface $lastN {
  $lastN: <V>(input: StaticInput<{ input: V; n: number }>) => V[];
}
