import { AggregateState } from '../../types/aggregate-state';
import { DeepKeyof } from '../../types/deep';

export interface autocomplete<State extends AggregateState> {
  autocomplete: {
    query: string | string[];
    path: DeepKeyof<State['T']>;
    tokenOrder?: 'any' | 'sequential';
    fuzzy?: {
      maxEdits?: 1 | 2;
      prefixLength?: number;
      maxExpansions?: number;
    };
    score?:
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
  };
}
