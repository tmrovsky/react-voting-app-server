/**
 * Created by tmrovsky on 23.09.2016.
 */


import {Map, fromJS} from 'immutable';
import {expect} from 'chai';
import reducer from '../src/reducer';

describe('reducer', () => {

    it('handles SET_ENTRIES', () => {
        const state = Map();
        const action = {type: 'SET_ENTRIES', entries: ['movie1', 'movie2']};
        const nextState = reducer(state, action);

        expect(nextState).to.equal(fromJS({entries: ['movie1', 'movie2']}));
    });

    it('handles NEXT', () => {
        const state = fromJS({
            entries: ['movie1', 'movie2']
        });
        const action = {type: 'NEXT'};
        const nextState = reducer(state, action);

        expect(nextState).to.equal(fromJS({
            entries: [],
            vote: {
                pair: ['movie1', 'movie2']
            }
        }));
    });

    it('handles VOTE', () => {
        const state = fromJS({
            entries: [],
            vote: {
                pair: ['movie1', 'movie2']
            }
        });
        const action = {type: 'VOTE', entry: 'movie1'};
        const nextState = reducer(state, action);

        expect(nextState).to.equal(fromJS({
            entries: [],
            vote: {
                pair: ['movie1', 'movie2'],
                label: {
                    movie1: 1
                }
            }
        }));
    });

    it('handles not defined action', () => {
        const state = fromJS({
            entries: ['movie1']
        });
        const action = {type: 'NOT_DEFINED_ACTION'};
        const nextState = reducer(state, action);

        expect(nextState).to.be.equal(state);
    });

    it('full vote logic with two entries till one become a winner', () => {
        const actions = [
            {type: 'SET_ENTRIES', entries: ['movie1', 'movie2']},
            {type: 'NEXT'},
            {type: 'VOTE', entry: 'movie1'},
            {type: 'VOTE', entry: 'movie2'},
            {type: 'VOTE', entry: 'movie1'},
            {type: 'NEXT'}
        ];
        const finalState = actions.reduce(reducer, Map());
        expect(finalState).to.equal(fromJS({
            winner: 'movie1'
        }));
    });
});