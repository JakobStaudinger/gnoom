import { AggregateState } from '../../types/aggregate-state';
import { AutocompleteOperator } from './autocomplete';
import { CompoundOperator } from './compound';
import { EmbeddedDocumentOperator } from './embeddedDocument';
import { EqualsOperator } from './equals';
import { ExistsOperator } from './exists';
import { GeoShapeOperator } from './geoShape';
import { GeoWithinOperator } from './geoWithin';
import { HasAncestorOperator } from './hasAncestor';
import { HasRootOperator } from './hasRoot';
import { InOperator } from './in';
import { KnnBetaOperator } from './knnBeta';
import { MoreLikeThisOperator } from './moreLikeThis';
import { NearOperator } from './near';

export interface SearchOperators<State extends AggregateState>
  extends
    AutocompleteOperator<State>,
    CompoundOperator<State>,
    EmbeddedDocumentOperator<State>,
    EqualsOperator<State>,
    ExistsOperator<State>,
    GeoShapeOperator<State>,
    GeoWithinOperator<State>,
    HasAncestorOperator<State>,
    HasRootOperator<State>,
    InOperator<State>,
    KnnBetaOperator<State>,
    MoreLikeThisOperator<State>,
    NearOperator<State> {}
