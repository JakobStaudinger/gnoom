import { MatchStage } from './$match';

export type AllStages<T extends object> = {
  $match: MatchStage<T>;
};
