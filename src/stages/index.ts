import { AddFieldsStage } from './$addFields';
import { BucketStage } from './$bucket';
import { BucketAutoStage } from './$bucketAuto';
import { CountStage } from './$count';
import { DocumentsStage } from './$documents';
import { FacetStage } from './$facet';
import { GeoNearStage } from './$geoNear';
import { GroupStage } from './$group';
import { LimitStage } from './$limit';
import { LookupStage } from './$lookup';
import { MatchStage } from './$match';
import { ProjectStage } from './$project';
import { ReplaceRootStage } from './$replaceRoot';
import { SetWindowFieldsStage } from './$setWindowFields';
import { SkipStage } from './$skip';
import { SortStage } from './$sort';
import { SortByCountStage } from './$sortByCount';
import { UnionWithStage } from './$unionWith';
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
    GeoNearStage<T>,
    GroupStage<T>,
    LimitStage<T>,
    LookupStage<T>,
    MatchStage<T>,
    ProjectStage<T>,
    ReplaceRootStage<T>,
    SetWindowFieldsStage<T>,
    SkipStage<T>,
    SortStage<T>,
    SortByCountStage<T>,
    UnionWithStage<T>,
    UnsetStage<T>,
    UnwindStage<T> {}
