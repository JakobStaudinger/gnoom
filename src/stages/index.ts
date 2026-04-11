import { AddFieldsStage } from './$addFields';
import { MatchStage } from './$match';
import { ProjectStage } from './$project';

export interface AllStages<T extends object>
  extends MatchStage<T>, AddFieldsStage<T>, ProjectStage<T> {}
