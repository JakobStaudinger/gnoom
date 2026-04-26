import { Aggregate } from '../aggregate';
import { FieldPathExpression } from '../expressions/field-path.expression';
import { DeepType } from '../types/deep-keyof';
import { Merge } from '../types/merge';

export interface UnwindStage<T extends object> {
  $unwind: <const S extends UnwindSpecification<T>>(
    specification: S
  ) => Aggregate<UnwindOutput<T, S>>;
}

export type UnwindSpecification<T extends object> =
  | FieldPathExpression<T>
  | {
      path: FieldPathExpression<T>;
      preserveNullAndEmptyArrays?: boolean;
      includeArrayIndex?: string;
    };

export type UnwindOutput<T extends object, S extends UnwindSpecification<T>> =
  S extends FieldPathExpression<T>
    ? UnwindOutput<T, { path: S }>
    : S extends {
          path: `$${infer Path}`;
          preserveNullAndEmptyArrays?: infer Preserve;
          includeArrayIndex?: infer I;
        }
      ? Merge<
          T,
          FromDeepEntry<
            Path,
            DeepType<T, Path> extends (infer E)[]
              ? Preserve extends true
                ? E | null
                : E
              : Preserve extends true
                ? DeepType<T, Path>
                : NonNullable<DeepType<T, Path>>
          > &
            (I extends string ? { [K in I]: number } : unknown)
        >
      : never;

type FromDeepEntry<
  Key extends string,
  Value
> = Key extends `${infer Head}.${infer Tail}`
  ? { [K in Head]: FromDeepEntry<Tail, Value> }
  : { [K in Key]: Value };
