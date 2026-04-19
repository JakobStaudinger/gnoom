import { Aggregate } from '../aggregate';
import { FieldPathExpression } from '../expressions/field-path.expression';
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

// TODO: fix unwind of nested properties
export type UnwindOutput<T extends object, S extends UnwindSpecification<T>> =
  S extends FieldPathExpression<T>
    ? UnwindOutput<T, { path: S }>
    : S extends {
          path: `$${infer Path extends keyof T & string}`;
          preserveNullAndEmptyArrays?: infer Preserve;
          includeArrayIndex?: infer I;
        }
      ? Merge<
          T,
          {
            [K in Path]: T[K] extends (infer E)[]
              ? E | (Preserve extends true ? null : never)
              : Preserve extends true
                ? T[K]
                : NonNullable<T[K]>;
          } & (I extends string ? { [K in I]: number } : unknown)
        >
      : never;
