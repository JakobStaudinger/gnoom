import { Aggregate } from '../aggregate';
import { AggregateExpression } from '../expressions';
import { AddStage, AggregateState } from '../types/aggregate-state';
import { DeepKeyof, DeepType, FromDeepEntry } from '../types/deep';
import { Simplify } from '../types/simplify';
import { UnionToIntersection } from '../types/union-to-intersection';
import { SortSpecification } from './$sort';

export interface $fill<State extends AggregateState> {
  $fill: <const S extends Specification<State>>(
    specification: S
  ) => Aggregate<Simplify<Output<State, S>>>;
}

type Specification<State extends AggregateState> = (
  | { partitionBy?: AggregateExpression<State> }
  | { partitionByFields?: DeepKeyof<State['T']>[] }
) &
  (
    | {
        output: Partial<
          Record<DeepKeyof<State['T']>, { value: AggregateExpression<State> }>
        >;
      }
    | {
        sortBy: SortSpecification<State>;
        output: Partial<
          Record<
            DeepKeyof<State['T']>,
            | { value: AggregateExpression<State> }
            | { method: 'linear' | 'locf' }
          >
        >;
      }
  );

type Output<
  State extends AggregateState,
  S extends Specification<State>
> = AddStage<
  State,
  {
    T: State['T'] &
      UnionToIntersection<
        {
          [K in keyof S['output'] & string]: FromDeepEntry<
            K,
            NonNullable<DeepType<State['T'], K>>
          >;
        }[keyof S['output'] & string]
      >;
  }
>;
