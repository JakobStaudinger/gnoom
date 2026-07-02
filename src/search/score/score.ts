import { AggregateState } from '../../types/aggregate-state';
import { DeepKeyof } from '../../types/deep';

export type ScoreAdjustment<
  State extends AggregateState,
  WithEmbedded extends boolean = false
> =
  | {
      boost:
        | {
            value: number;
          }
        | {
            path: DeepKeyof<State['T']>;
            undefined?: number;
          };
    }
  | {
      constant: {
        value: number;
      };
    }
  | {
      // TODO: implement expressions
      function: unknown;
    }
  | (WithEmbedded extends true
      ? {
          embedded: {
            aggregate?: 'sum' | 'maximum' | 'minimum' | 'mean';
            outerScore?: ScoreAdjustment<State>;
          };
        }
      : never);
