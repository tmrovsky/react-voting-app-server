/**
 * Created by tmrovsky on 22.09.2016.
 */

import {Map, List} from 'immutable';

export function setEntries (state, entries) {
    return state.set('entries', List(entries));
}

export function next (state) {

    const entries = state.get('entries').concat(getWinner(state.get('vote')));
    if (entries.size === 1) {
        return state
            .remove('entries')
            .remove('vote')
            .set('winner', entries.first())
    }
    getWinner(state.get('vote'));
    return state.merge({
        entries: entries.skip(2),
        vote: Map({
            pair: entries.take(2)
        })
    });
}

export function vote (state, movie) {
    return state.updateIn(['vote', 'label', movie], 0, votesNumber => votesNumber + 1)
}

function getWinner (vote) {
    if (!vote) return [];
    const [item1, item2] = vote.get('pair'); // movie4 movie5
    const item1Voted = vote.getIn(['label', item1], 0);
    const item2Voted = vote.getIn(['label', item2], 0);
    if (item1Voted > item2Voted) return [item1];
    else if (item1Voted < item2Voted) return [item2];
    else return [item1, item2];

}



// vote: Map({
//     pair: List.of('movie4', 'movie5'),
//     label: Map({
//         movie4: 2,
//         movie5: 5
//     })
// })