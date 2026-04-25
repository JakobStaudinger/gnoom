import { StaticInput } from '../../static-input';

export interface $trim {
  $trim: (
    input: StaticInput<{
      input: string;
      chars?: string;
    }>
  ) => string;
}
