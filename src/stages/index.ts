import { AddFieldsStage } from './$addFields';
import { MatchStage } from './$match';

export type AllStages<T extends object> = MatchStage<T> & AddFieldsStage<T>;
