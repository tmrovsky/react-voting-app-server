/**
 * Created by tmrovsky on 22.09.2016.
 */

import {List, Map} from 'immutable';
import {expect} from 'chai';
import {setEntries, next, vote} from '../src/core';

describe('Application logic', () => {

    describe('setEntries', () => {

        it('adds the entries to the state', () => {
            const state = Map();
            const entries = ['movie1', 'movie2'];
            const nextState = setEntries(state, entries);

            expect(nextState).to.equal(Map({
                entries: List.of('movie1', 'movie2')
            }));
        });
    });

    describe('next (start voting)', () => {

        it('takes the two next entries under vote', () => {
            const state = Map({
                entries: List.of('movie1', 'movie2', 'movie3')
            });
            const nextState = next(state);

            expect(nextState).to.equal(Map({
                entries: List.of('movie3'),
                vote: Map({
                    pair: List.of('movie1', 'movie2')
                })
            }));
        });

        it('puts winner of current vote back to entries', () => {
            const state = Map({
                entries: List.of('movie1', 'movie2', 'movie3'),
                vote: Map({
                    pair: List.of('movie4', 'movie5'),
                    label: Map({
                        movie4: 2,
                        movie5: 5
                    })
                })
            });

            const nextState = next(state);

            expect(nextState).to.equal(Map({
                entries: List.of('movie3', 'movie5'),
                vote: Map({
                    pair: List.of('movie1', 'movie2')
                })
            }));
        });

        it('puts both of tied vote back to entries', () => {
            const state = Map({
                entries: List.of('movie1', 'movie2', 'movie3'),
                vote: Map({
                    pair: List.of('movie4', 'movie5'),
                    label: Map({
                        movie4: 3,
                        movie5: 3
                    })
                })
            });

            const nextState = next(state);

            expect(nextState).to.equal(Map({
                entries: List.of('movie3', 'movie4', 'movie5'),
                vote: Map({
                    pair: List.of('movie1', 'movie2')
                })
            }));
        });

        it('indicate winner when just one entry left', () => {
            const state = Map({
                entries: List(),
                vote: Map({
                    pair: List.of('movie1', 'movie2'),
                    label: Map({
                        movie1: 3,
                        movie2: 1
                    })
                })
            });
            const nextState = next(state);

            expect(nextState).to.equal(Map({
                winner: 'movie1'
            }))
        })
    });

    describe('vote', () => {

        it('creates a label for the voted entry if not exist', () => {
            const state = Map({
                pair: List.of('movie1', 'movie2')
            });
            const nextState = vote(state, 'movie1');

            expect(nextState).to.equal(Map({
                pair: List.of('movie1', 'movie2'),
                label: Map({
                    movie1: 1
                })
            }));
        });

        it('increment number of votes for entry if its label exist ', () => {
            const state = Map({
                pair: List.of('movie1', 'movie2'),
                label: Map({
                    movie1: 3,
                    movie2: 1
                })
            });
            const nextState = vote(state, 'movie1');

            expect(nextState).to.equal(Map({
                pair: List.of('movie1', 'movie2'),
                label: Map({
                    movie1: 4,
                    movie2: 1
                })
            }));
        });
    });
});
