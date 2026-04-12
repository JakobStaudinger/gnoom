import { AddFieldsStage } from './$addFields';
import { CountStage } from './$count';
import { MatchStage } from './$match';
import { ProjectStage } from './$project';
import { UnsetStage } from './$unset';

export interface AllStages<T extends object>
  extends
    MatchStage<T>,
    AddFieldsStage<T>,
    ProjectStage<T>,
    UnsetStage<T>,
    CountStage {}
