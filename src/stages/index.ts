import { AggregateState, UnlessFinalized } from '../types/aggregate-state';
import { $addFields } from './$addFields';
import { $bucket } from './$bucket';
import { $bucketAuto } from './$bucketAuto';
import { $count } from './$count';
import { $documents } from './$documents';
import { $facet } from './$facet';
import { $geoNear } from './$geoNear';
import { $graphLookup } from './$graphLookup';
import { $group } from './$group';
import { $limit } from './$limit';
import { $lookup } from './$lookup';
import { $match } from './$match';
import { $merge } from './$merge';
import { $out } from './$out';
import { $project } from './$project';
import { $replaceRoot } from './$replaceRoot';
import { $sample } from './$sample';
import { $setWindowFields } from './$setWindowFields';
import { $skip } from './$skip';
import { $sort } from './$sort';
import { $sortByCount } from './$sortByCount';
import { $unionWith } from './$unionWith';
import { $unset } from './$unset';
import { $unwind } from './$unwind';

export type AllStages<State extends AggregateState> = {
  [S in keyof AllStagesMap<State>]: UnlessFinalized<
    State,
    AllStagesMap<State>[S]
  >;
};

interface AllStagesMap<State extends AggregateState>
  extends
    $addFields<State>,
    $bucket<State>,
    $bucketAuto<State>,
    $count<State>,
    $documents<State>,
    $facet<State>,
    $geoNear<State>,
    $graphLookup<State>,
    $group<State>,
    $limit<State>,
    $lookup<State>,
    $match<State>,
    $merge<State>,
    $out<State>,
    $project<State>,
    $replaceRoot<State>,
    $sample<State>,
    $setWindowFields<State>,
    $skip<State>,
    $sort<State>,
    $sortByCount<State>,
    $unionWith<State>,
    $unset<State>,
    $unwind<State> {}
