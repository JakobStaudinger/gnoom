import { AddFieldsStage } from './$addFields';
import { BucketStage } from './$bucket';
import { CountStage } from './$count';
import { DocumentsStage } from './$documents';
import { GroupStage } from './$group';
import { LimitStage } from './$limit';
import { MatchStage } from './$match';
import { ProjectStage } from './$project';
import { SkipStage } from './$skip';
import { SortStage } from './$sort';
import { SortByCountStage } from './$sortByCount';
import { UnsetStage } from './$unset';
import { UnwindStage } from './$unwind';

export interface AllStages<T extends object>
  extends
    AddFieldsStage<T>,
    BucketStage<T>,
    CountStage,
    DocumentsStage,
    GroupStage<T>,
    LimitStage<T>,
    MatchStage<T>,
    ProjectStage<T>,
    SkipStage<T>,
    SortStage<T>,
    SortByCountStage<T>,
    UnsetStage<T>,
    UnwindStage<T> {}
