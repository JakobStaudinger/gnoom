import { AggregateState, UnlessFinalized } from '../types/aggregate-state';
import { $addFields } from './$addFields';
import { $bucket } from './$bucket';
import { $bucketAuto } from './$bucketAuto';
import { $changeStream } from './$changeStream';
import { $changeStreamSplitLargeEvent } from './$changeStreamSplitLargeEvent';
import { $collStats } from './$collStats';
import { $count } from './$count';
import { $densify } from './$densify';
import { $documents } from './$documents';
import { $facet } from './$facet';
import { $fill } from './$fill';
import { $geoNear } from './$geoNear';
import { $graphLookup } from './$graphLookup';
import { $group } from './$group';
import { $indexStats } from './$indexStats';
import { $limit } from './$limit';
import { $lookup } from './$lookup';
import { $match } from './$match';
import { $merge } from './$merge';
import { $out } from './$out';
import { $project } from './$project';
import { $rankFusion } from './$rankFusion';
import { $redact } from './$redact';
import { $replaceRoot } from './$replaceRoot';
import { $sample } from './$sample';
import { $search } from './$search';
import { $searchMeta } from './$searchMeta';
import { $setWindowFields } from './$setWindowFields';
import { $skip } from './$skip';
import { $sort } from './$sort';
import { $sortByCount } from './$sortByCount';
import { $unionWith } from './$unionWith';
import { $unset } from './$unset';
import { $unwind } from './$unwind';
import { $vectorSearch } from './$vectorSearch';

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
    $changeStream<State>,
    $changeStreamSplitLargeEvent<State>,
    $collStats<State>,
    $count<State>,
    $densify<State>,
    $documents<State>,
    $facet<State>,
    $fill<State>,
    $geoNear<State>,
    $graphLookup<State>,
    $group<State>,
    $indexStats<State>,
    $limit<State>,
    $lookup<State>,
    $match<State>,
    $merge<State>,
    $out<State>,
    $project<State>,
    $rankFusion<State>,
    $redact<State>,
    $replaceRoot<State>,
    $sample<State>,
    $search<State>,
    $searchMeta<State>,
    $setWindowFields<State>,
    $skip<State>,
    $sort<State>,
    $sortByCount<State>,
    $unionWith<State>,
    $unset<State>,
    $unwind<State>,
    $vectorSearch<State> {}
