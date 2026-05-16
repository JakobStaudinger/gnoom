import { AggregateState } from './aggregate-state';
import { GnoomError } from './error';
import { MongoParametersToTypeScriptSyntax } from './map-syntax';

export interface FunctionSignature {
  arguments: unknown[];
  return: unknown;
}

export type EvaluateFunctionLikeExpression<
  State extends AggregateState,
  E,
  Map,
  Name extends string
> = {
  [K in keyof E & string]: EvaluateFunctionLikeExpressionHelper<
    State,
    E,
    K,
    Map,
    Name
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
        ? Acc extends FunctionSignature
          ? Args extends Acc['arguments']
            ? (Acc & { arguments: Args })['return']
            : GnoomError<{
                message: `Invalid arguments passed to ${ExpressionType} "${K}"`;
                name: K;
                signature: (...args: Acc['arguments']) => Acc['return'];
                arguments: Args;
              }>
          : GnoomError<{
              message: `Error in declaration of ${ExpressionType} "${K}". This is a bug in the libary, please report this issue.`;
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
