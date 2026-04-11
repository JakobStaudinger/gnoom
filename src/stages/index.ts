import { AddFieldsStage } from './$addFields';
import { MatchStage } from './$match';
import { ProjectStage } from './$project';

export type AllStages<T extends object> = MatchStage<T> &
  AddFieldsStage<T> &
  ProjectStage<T>;
