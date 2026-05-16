import { AggregateState } from './aggregate-state';
import { ErrorIfAllOverloadsErrored, GnoomError } from './error';
import { MongoParametersToTypeScriptSyntax } from './map-syntax';

export type EvaluateFunctionLikeExpression<
  State extends AggregateState,
  E,
  Map,
  Name extends string
> = {
  [K in keyof E & string]: ErrorIfAllOverloadsErrored<
    EvaluateFunctionLikeExpressionHelper<State, E, K, Map, Name>
  >;
}[keyof E & string];

type EvaluateFunctionLikeExpressionHelper<
  State extends AggregateState,
  E,
  K extends keyof E & string,
  Map,
  ExpressionType extends string
> = K extends keyof Map
  ? Map[K] extends infer Acc
    ? MongoParametersToTypeScriptSyntax<State, E[K]> extends infer Args
      ? Args extends unknown[]
        ? Acc extends (...args: Args) => infer R
          ? ((...args: ExtractRequired<Args>) => never) extends Acc
            ? R
            : GnoomError<{
                message: `Too many arguments passed to ${ExpressionType} "${K}"`;
                name: K;
                signature: Acc;
                arguments: Args;
              }>
          : GnoomError<{
              message: `Invalid arguments passed to ${ExpressionType} "${K}"`;
              name: K;
              signature: Acc;
              arguments: Args;
            }>
        : GnoomError<{
            message: `Invalid arguments passed to ${ExpressionType} "${K}"`;
            name: K;
            signature: Acc;
            arguments: E[K];
          }>
      : never
    : never
  : GnoomError<{ message: `Unknown ${ExpressionType} "${K}"`; name: K }>;

type ExtractRequired<
  Arr extends readonly unknown[],
  Acc extends unknown[] = []
> = Arr extends readonly [infer _Head, ...infer Tail]
  ? ExtractRequired<Tail, [...Acc, unknown]>
  : Acc;
