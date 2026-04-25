import { StaticInput } from '../expressions/static-input';

export interface $maxN {
  $maxN: <V extends number>(input: StaticInput<{ input: V; n: number }>) => V[];
}
