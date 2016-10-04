/**
 * Created by tmrovsky on 04.10.2016.
 */

import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import makeStore from '../src/store';

describe('store', () => {
    it('is a Redux store cofigured with the proper reducer', () => {
        const store = makeStore();
        expect(store.getState()).to.equal(Map());

        store.dispatch({
            type: 'SET_ENTRIES',
            entries: ['movie1', 'movie2']
        });

        expect(store.getState()).to.equal(fromJS({
            entries: ['movie1', 'movie2']
        }));
    });
});
