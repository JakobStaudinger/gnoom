import { Timestamp, UUID } from 'mongodb';
import { Aggregate } from '../aggregate';
import { AggregateState, WithType } from '../types/aggregate-state';
import { AnyObject } from '../types/object';
import { DeepKeyof } from '../types/deep';

export interface $changeStream<State extends AggregateState> {
  $changeStream: <const S extends Specification>(
    specification: S
  ) => Aggregate<Output<State, S>>;
}

type ResumeToken = unknown;

type Specification = {
  /**
   * Only usable on `admin` database
   */
  allChangesForCluster?: boolean;
  /**
   * Whether to include the full document (after the change) in the output.
   * Note that `required` and `whenAvailable` only work when `changeStreamPreAndPostImages` is enabled for the collection
   * @see https://www.mongodb.com/docs/manual/reference/command/collMod/#mongodb-dbcommand-dbcmd.collMod
   */
  fullDocument?: 'default' | 'required' | 'updateLookup' | 'whenAvailable';
  /**
   * Whether to include the full document _before_ the change in the output.
   * Note that using this option requires setting `changeStreamPreAndPostImages` for the collection
   * @see https://www.mongodb.com/docs/manual/reference/command/collMod/#mongodb-dbcommand-dbcmd.collMod
   */
  fullDocumentBeforeChange?: 'off' | 'whenAvailable' | 'required';
  /**
   * Include additional change events like DDL and index operations
   * @since 6.0
   */
  showExpandedEvents?: boolean;
} & (
  | {
      resumeAfter?: ResumeToken;
      startAfter?: never;
      startAtOperationTime?: never;
    }
  | {
      startAfter?: ResumeToken;
      resumeAfter?: never;
      startAtOperationTime?: never;
    }
  | {
      startAtOperationTime?: Timestamp;
      startAfter?: never;
      resumeAfter?: never;
    }
);

type Output<State extends AggregateState, S extends Specification> = WithType<
  State,
  | CreateEvent<S>
  | CreateIndexesEvent<S>
  | DeleteEvent
  | DropEvent
  | DropDatabaseEvent
  | DropIndexesEvent<S>
  | InsertEvent<State>
  | InvalidateEvent
  | ModifyEvent<S>
  | RefineCollectionShardKeyEvent<S>
  | RenameEvent<S>
  | ReplaceEvent<State, S>
  | ReshardCollectionEvent<S>
  | ShardCollectionEvent<S>
  | UpdateEvent<State, S>
>;

type IfExpandedEvents<
  S extends Specification,
  T
> = S['showExpandedEvents'] extends true ? T : never;

interface EventBase {
  _id: ResumeToken;
  clusterTime: Timestamp;
}

interface TransactionInfo {
  lsid?: unknown;
  txnNumber?: number;
}

interface CollectionInfo {
  collectionUUID?: UUID;
}

interface NsInfo {
  ns: { db: string; coll?: string };
  /**
   * @since 8.1 (also in 8.0.5)
   */
  nsType: 'collection' | 'timeseries' | 'view';
}

interface WallTimeInfo {
  wallTime: Date;
}

interface IndexInfo {
  v: number;
  key: AnyObject;
  name: string;
}

type MaybeFullDocument<
  T,
  S extends Specification
> = S['fullDocument'] extends 'required'
  ? { fullDocument: T }
  : S['fullDocument'] extends 'whenAvailable' | 'updateLookup'
    ? { fullDocument: T | null }
    : unknown;

type MaybeFullDocumentBeforeChange<
  T,
  S extends Specification
> = S['fullDocumentBeforeChange'] extends 'required'
  ? { fullDocumentBeforeChange: T }
  : S['fullDocumentBeforeChange'] extends 'whenAvailable'
    ? { fullDocumentBeforeChange: T | null }
    : unknown;

interface CreateEvent<S extends Specification>
  extends EventBase, CollectionInfo, TransactionInfo, NsInfo, WallTimeInfo {
  operationType: 'create';
  operationDescription: IfExpandedEvents<S, { idIndex: IndexInfo }>;
}

interface CreateIndexesEvent<S extends Specification>
  extends EventBase, CollectionInfo, TransactionInfo, NsInfo, WallTimeInfo {
  operationType: 'createIndexes';
  operationDescription: IfExpandedEvents<S, { indexes: IndexInfo[] }>;
}

interface DeleteEvent
  extends EventBase, CollectionInfo, TransactionInfo, NsInfo, WallTimeInfo {
  operationType: 'delete';
  documentKey: AnyObject;
}

interface DropEvent
  extends EventBase, CollectionInfo, TransactionInfo, NsInfo, WallTimeInfo {
  operationType: 'drop';
}

interface DropDatabaseEvent
  extends EventBase, TransactionInfo, NsInfo, WallTimeInfo {
  operationType: 'dropDatabase';
}

interface DropIndexesEvent<S extends Specification>
  extends EventBase, CollectionInfo, TransactionInfo, NsInfo, WallTimeInfo {
  operationType: 'dropIndexes';
  operationDescription: IfExpandedEvents<S, { indexes: IndexInfo[] }>;
}

interface InsertEvent<State extends AggregateState>
  extends EventBase, CollectionInfo, TransactionInfo, NsInfo, WallTimeInfo {
  operationType: 'insert';
  documentKey: unknown;
  fullDocument: State['T'];
}

interface InvalidateEvent extends EventBase, WallTimeInfo {
  operationType: 'invalidate';
}

interface ModifyEvent<S extends Specification>
  extends EventBase, CollectionInfo, TransactionInfo, NsInfo, WallTimeInfo {
  operationType: 'modify';
  operationDescription: IfExpandedEvents<
    S,
    { index: IndexInfo; indexes: IndexInfo[] }
  >;
  stateBeforeChange: { collectionOptions: AnyObject; indexOptions: AnyObject };
}

interface RefineCollectionShardKeyEvent<S extends Specification>
  extends EventBase, CollectionInfo, NsInfo {
  operationType: 'refineCollectionShardKey';
  operationDescription: IfExpandedEvents<
    S,
    { shardKey: AnyObject; oldShardKey: AnyObject }
  >;
}

interface RenameEvent<S extends Specification>
  extends EventBase, CollectionInfo, TransactionInfo, NsInfo, WallTimeInfo {
  operationType: 'rename';
  operationDescription: IfExpandedEvents<
    S,
    { dropTarget: UUID; to: { db: string; coll: string } }
  >;
  to: { db: string; coll: string };
}

interface ReplaceEventBase
  extends EventBase, CollectionInfo, TransactionInfo, NsInfo, WallTimeInfo {
  operationType: 'replace';
  documentKey: AnyObject;
}

type ReplaceEvent<
  State extends AggregateState,
  S extends Specification
> = ReplaceEventBase &
  MaybeFullDocument<State['T'], S> &
  MaybeFullDocumentBeforeChange<State['T'], S>;

interface ReshardCollectionEvent<S extends Specification>
  extends EventBase, CollectionInfo, NsInfo {
  operationType: 'reshardCollection';
  operationDescription: IfExpandedEvents<
    S,
    {
      reshardUUID: UUID;
      shardKey: AnyObject;
      oldShardKey: AnyObject;
      unique: boolean;
      numInitialChunks: number;
      collation: AnyObject;
      zones: unknown[];
    }
  >;
}

interface ShardCollectionEvent<S extends Specification>
  extends EventBase, CollectionInfo, TransactionInfo, NsInfo, WallTimeInfo {
  operationType: 'shardCollection';
  operationDescription: IfExpandedEvents<
    S,
    {
      presplitHashedZones: boolean;
      shardKey: AnyObject;
      unique: boolean;
    }
  >;
}

interface UpdateEventBase<State extends AggregateState, S extends Specification>
  extends EventBase, CollectionInfo, TransactionInfo, NsInfo, WallTimeInfo {
  operationType: 'update';
  documentKey: AnyObject;
  updateDescription: {
    updatedFields: AnyObject;
    removedFields: DeepKeyof<State['T']>[];
    truncatedArrays: { field: DeepKeyof<State['T']>; newSize: number }[];
  } & IfExpandedEvents<S, { disambiguatedPaths: AnyObject }>;
}

type UpdateEvent<
  State extends AggregateState,
  S extends Specification
> = UpdateEventBase<State, S> &
  MaybeFullDocument<State['T'], S> &
  MaybeFullDocumentBeforeChange<State['T'], S>;
