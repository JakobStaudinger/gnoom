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
import { OutStage } from './$out';
import { ProjectStage } from './$project';
import { ReplaceRootStage } from './$replaceRoot';
import { SampleStage } from './$sample';
import { SetWindowFieldsStage } from './$setWindowFields';
import { SkipStage } from './$skip';
import { SortStage } from './$sort';
import { SortByCountStage } from './$sortByCount';
import { UnionWithStage } from './$unionWith';
import { UnsetStage } from './$unset';
import { UnwindStage } from './$unwind';

export type AllStages<State extends AggregateState> = {
  [S in keyof AllStagesMap<State>]: UnlessFinalized<
    State,
    AllStagesMap<State>[S]
  >;
};

interface AllStagesMap<State extends AggregateState>
  extends
    AddFieldsStage<State>,
    BucketStage<State>,
    BucketAutoStage<State>,
    CountStage<State>,
    DocumentsStage<State>,
    FacetStage<State>,
    GeoNearStage<State>,
    GraphLookupStage<State>,
    GroupStage<State>,
    LimitStage<State>,
    LookupStage<State>,
    MatchStage<State>,
    MergeStage<State>,
    OutStage<State>,
    ProjectStage<State>,
    ReplaceRootStage<State>,
    SampleStage<State>,
    SetWindowFieldsStage<State>,
    SkipStage<State>,
    SortStage<State>,
    SortByCountStage<State>,
    UnionWithStage<State>,
    UnsetStage<State>,
    UnwindStage<State> {}
