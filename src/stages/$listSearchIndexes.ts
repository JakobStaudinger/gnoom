import { Aggregate } from '../aggregate';
import {
  AddStage,
  AggregateState,
  MustBeFirstStage
} from '../types/aggregate-state';
import { AnyObject } from '../types/object';

export interface $listSearchIndexes<State extends AggregateState> {
  $listSearchIndexes: MustBeFirstStage<
    State,
    <const S extends Specification>(
      specification: S
    ) => Aggregate<Output<State>>
  >;
}

interface Specification {
  id?: string;
  name?: string;
}

type IndexStatus =
  | 'BUILDING'
  | 'DOES_NOT_EXIST'
  | 'DELETING'
  | 'FAILED'
  | 'PENDING'
  | 'READY'
  | 'STALE';

type SynonymMappingStatus = 'BUILDING' | 'FAILED' | 'READY';

type Output<State extends AggregateState> = AddStage<
  State,
  {
    T: {
      id: string;
      name: string;
      status: IndexStatus;
      queryable: boolean;
      latestDefinitionVersion: {
        version: number;
        createdAt: Date;
      };
      latestDefinition: AnyObject;
      statusDetail: {
        hostname: string;
        status: IndexStatus;
        queryable: boolean;
        mainIndex: IndexStatusDetails;
        stagedIndex?: IndexStatusDetails;
      }[];
      synonymMappingStatus?: SynonymMappingStatus;
      synonymMappingStatusDetail?: SynonymMappingStatusDetail;
    };
  }
>;

interface IndexStatusDetails {
  status: IndexStatus;
  queryable: boolean;
  synonymMappingStatus?: SynonymMappingStatus;
  synonymMappingStatusDetails?: SynonymMappingStatusDetail;
}

interface SynonymMappingStatusDetail {
  status: SynonymMappingStatus;
  queryable: boolean;
  message?: string;
}
