/**
 * Created by tmrovsky on 23.09.2016.
 */

import {setEntries, next, vote, INITIAL_STATE} from './core';

export default function reducer (state = INITIAL_STATE , action) {
    switch (action.type) {
        case 'SET_ENTRIES':
            return setEntries(state, action.entries);
        case 'NEXT':
            return next(state);
        case 'VOTE':
            return vote(state, action.entry);
        default:
            return state;
    }
}
