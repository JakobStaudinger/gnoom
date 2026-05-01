import { Aggregate } from '../aggregate';
import { FieldPathExpression } from '../expressions/field-path.expression';
import { AggregateState, WithType } from '../types/aggregate-state';
import { DeepType, FromDeepEntry } from '../types/deep';
import { Merge } from '../types/merge';

export interface UnwindStage<State extends AggregateState> {
  $unwind: <const S extends UnwindSpecification<State>>(
    specification: S
  ) => Aggregate<UnwindOutput<State, S>>;
}

type UnwindSpecification<State extends AggregateState> =
  | FieldPathExpression<State>
  | {
      path: FieldPathExpression<State>;
      preserveNullAndEmptyArrays?: boolean;
      includeArrayIndex?: string;
    };

type UnwindOutput<
  State extends AggregateState,
  S extends UnwindSpecification<State>
> = WithType<State, UnwindOutputHelper<State, S>>;

type UnwindOutputHelper<
  State extends AggregateState,
  S extends UnwindSpecification<State>
> =
  S extends FieldPathExpression<State>
    ? UnwindOutputHelper<State, { path: S }>
    : S extends {
          path: `$${infer Path}`;
          preserveNullAndEmptyArrays?: infer Preserve;
          includeArrayIndex?: infer I;
        }
      ? Merge<
          State['T'],
          FromDeepEntry<
            Path,
            DeepType<State['T'], Path> extends (infer E)[]
              ? Preserve extends true
                ? E | null
                : E
              : Preserve extends true
                ? DeepType<State['T'], Path>
                : NonNullable<DeepType<State['T'], Path>>
          > &
            (I extends string ? { [K in I]: number } : unknown)
        >
      : never;
