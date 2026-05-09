declare const GNOOM_ERROR: unique symbol;

export interface GnoomError<E extends { message: string }> {
  [GNOOM_ERROR]: E;
}

export type ErrorsFromFields<O> = O[keyof O] extends infer T
  ? T extends GnoomError<infer E>
    ? E
    : never
  : never;
