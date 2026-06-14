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
import { $listClusterCatalog } from './$listClusterCatalog';
import { $listLocalSessions } from './$listLocalSessions';
import { $listSampledQueries } from './$listSampledQueries';
import { $listSearchIndexes } from './$listSearchIndexes';
import { $listSessions } from './$listSessions';
import { $lookup } from './$lookup';
import { $match } from './$match';
import { $merge } from './$merge';
import { $out } from './$out';
import { $planCacheStats } from './$planCacheStats';
import { $project } from './$project';
import { $querySettings } from './$querySettings';
import { $queryStats } from './$queryStats';
import { $rankFusion } from './$rankFusion';
import { $redact } from './$redact';
import { $replaceRoot } from './$replaceRoot';
import { $sample } from './$sample';
import { $score } from './$score';
import { $search } from './$search';
import { $searchMeta } from './$searchMeta';
import { $setWindowFields } from './$setWindowFields';
import { $shardedDataDistribution } from './$shardedDataDistribution';
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
    $listClusterCatalog<State>,
    $listLocalSessions<State>,
    $listSampledQueries<State>,
    $listSearchIndexes<State>,
    $listSessions<State>,
    $lookup<State>,
    $match<State>,
    $merge<State>,
    $out<State>,
    $planCacheStats<State>,
    $project<State>,
    $querySettings<State>,
    $queryStats<State>,
    $rankFusion<State>,
    $redact<State>,
    $replaceRoot<State>,
    $sample<State>,
    $score<State>,
    $search<State>,
    $searchMeta<State>,
    $setWindowFields<State>,
    $shardedDataDistribution<State>,
    $skip<State>,
    $sort<State>,
    $sortByCount<State>,
    $unionWith<State>,
    $unset<State>,
    $unwind<State>,
    $vectorSearch<State> {}
