import { AggregateState, UnlessFinalized } from '../types/aggregate-state';
import { AddFieldsStage } from './$addFields';
import { BucketStage } from './$bucket';
import { BucketAutoStage } from './$bucketAuto';
import { CountStage } from './$count';
import { DocumentsStage } from './$documents';
import { FacetStage } from './$facet';
import { GeoNearStage } from './$geoNear';
import { GraphLookupStage } from './$graphLookup';
import { GroupStage } from './$group';
import { LimitStage } from './$limit';
import { LookupStage } from './$lookup';
import { MatchStage } from './$match';
import { MergeStage } from './$merge';
import { ProjectStage } from './$project';
import { ReplaceRootStage } from './$replaceRoot';
import { SetWindowFieldsStage } from './$setWindowFields';
import { SkipStage } from './$skip';
import { SortStage } from './$sort';
import { SortByCountStage } from './$sortByCount';
import { UnionWithStage } from './$unionWith';
import { UnsetStage } from './$unset';
import { UnwindStage } from './$unwind';

export type AllStages<T extends object, State extends AggregateState> = {
  [S in keyof AllStagesMap<T, State>]: UnlessFinalized<
    State,
    AllStagesMap<T, State>[S]
  >;
};

interface AllStagesMap<T extends object, State extends AggregateState>
  extends
    AddFieldsStage<T>,
    BucketStage<T>,
    BucketAutoStage<T>,
    CountStage,
    DocumentsStage<State>,
    FacetStage<T>,
    GeoNearStage<T, State>,
    GraphLookupStage<T>,
    GroupStage<T>,
    LimitStage<T>,
    LookupStage<T>,
    MatchStage<T>,
    MergeStage<T, State>,
    ProjectStage<T>,
    ReplaceRootStage<T>,
    SetWindowFieldsStage<T>,
    SkipStage<T>,
    SortStage<T>,
    SortByCountStage<T>,
    UnionWithStage<T>,
    UnsetStage<T>,
    UnwindStage<T> {}
