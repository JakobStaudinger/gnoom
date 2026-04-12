import { Aggregate } from '../aggregate';

export interface UnwindStage<T extends object> {
  $unwind: <const S extends UnwindSpecification<T>>(
    specification: S
  ) => Aggregate<UnwindOutput<T, S>>;
}

export type UnwindSpecification<T extends object> =
  | PropertyPath<T>
  | {
      path: PropertyPath<T>;
      preserveNullAndEmptyArrays?: boolean;
      includeArrayIndex?: string;
    };

type PropertyPath<T extends object> = `$${keyof T & string}`;

export type UnwindOutput<T extends object, S extends UnwindSpecification<T>> =
  S extends PropertyPath<T>
    ? UnwindOutput<T, { path: S }>
    : S extends {
          path: `$${infer Path extends keyof T & string}`;
          preserveNullAndEmptyArrays?: infer Preserve;
          includeArrayIndex?: infer I;
        }
      ? Omit<T, Path> & {
          [K in Path]: T[K] extends (infer E)[]
            ? E | (Preserve extends true ? null : never)
            : Preserve extends true
              ? T[K]
              : NonNullable<T[K]>;
        } & (I extends string ? { [K in I]: number } : unknown)
      : never;
