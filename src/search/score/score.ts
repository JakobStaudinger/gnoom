import { AggregateState } from '../../types/aggregate-state';
import { DeepKeyof } from '../../types/deep';

export type ScoreAdjustment<State extends AggregateState> =
  | {
      boost:
        | {
            value: string;
          }
        | {
            path: DeepKeyof<State['T']>;
            undefined?: number;
          };
    }
  | {
      constant: {
        value: string;
      };
    }
  | {
      // TODO: implement expressions
      function: unknown;
    };
