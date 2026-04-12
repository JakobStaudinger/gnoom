import { AddFieldsStage } from './$addFields';
import { CountStage } from './$count';
import { DocumentsStage } from './$documents';
import { LimitStage } from './$limit';
import { MatchStage } from './$match';
import { ProjectStage } from './$project';
import { SkipStage } from './$skip';
import { SortStage } from './$sort';
import { SortByCountStage } from './$sortByCount';
import { UnsetStage } from './$unset';

export interface AllStages<T extends object>
  extends
    MatchStage<T>,
    AddFieldsStage<T>,
    ProjectStage<T>,
    UnsetStage<T>,
    CountStage,
    DocumentsStage,
    LimitStage<T>,
    SkipStage<T>,
    SortStage<T>,
    SortByCountStage<T> {}
