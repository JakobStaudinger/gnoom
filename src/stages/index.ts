import { AddFieldsStage } from './$addFields';
import { BucketStage } from './$bucket';
import { BucketAutoStage } from './$bucketAuto';
import { CountStage } from './$count';
import { DocumentsStage } from './$documents';
import { FacetStage } from './$facet';
import { GroupStage } from './$group';
import { LimitStage } from './$limit';
import { LookupStage } from './$lookup';
import { MatchStage } from './$match';
import { ProjectStage } from './$project';
import { SetWindowFieldsStage } from './$setWindowFields';
import { SkipStage } from './$skip';
import { SortStage } from './$sort';
import { SortByCountStage } from './$sortByCount';
import { UnsetStage } from './$unset';
import { UnwindStage } from './$unwind';

export interface AllStages<T extends object>
  extends
    AddFieldsStage<T>,
    BucketStage<T>,
    BucketAutoStage<T>,
    CountStage,
    DocumentsStage,
    FacetStage<T>,
    GroupStage<T>,
    LimitStage<T>,
    LookupStage<T>,
    MatchStage<T>,
    ProjectStage<T>,
    SetWindowFieldsStage<T>,
    SkipStage<T>,
    SortStage<T>,
    SortByCountStage<T>,
    UnsetStage<T>,
    UnwindStage<T> {}
