import { AggregateState } from '../../types/aggregate-state';
import { autocomplete } from './autocomplete';
import { compound } from './compound';
import { embeddedDocument } from './embeddedDocument';
import { equals } from './equals';
import { exists } from './exists';
import { geoShape } from './geoShape';
import { geoWithin } from './geoWithin';
import { hasAncestor } from './hasAncestor';
import { hasRoot } from './hasRoot';

export interface SearchOperators<State extends AggregateState>
  extends
    autocomplete<State>,
    compound<State>,
    embeddedDocument<State>,
    equals<State>,
    exists<State>,
    geoShape<State>,
    geoWithin<State>,
    hasAncestor<State>,
    hasRoot<State> {}
