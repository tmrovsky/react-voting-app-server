/**
 * Created by tmrovsky on 22.09.2016.
 */

import {expect} from 'chai';
import {List, Map} from 'immutable';

describe('immutability', () => {

    describe('A number', () => {

        function increment (state) {
            return state + 1;
        }

        it('is immutable', () => {
            let state = 42;
            let nextState = increment(state);

            expect(nextState).to.equal(43);
            expect(state).to.equal(42);
        });
    });

    describe('A List', () => {

        function addMovie (state, movie) {
            return state.push(movie);
        }

        it('is immutable', () => {
            let state = List.of('movie1', 'movie2');
            let nextState = addMovie(state, 'movie3');

            expect(nextState).to.equal(List.of(
                'movie1',
                'movie2',
                'movie3'
            ));

            expect(state).to.equal(List.of(
                'movie1',
                'movie2'
            ));
        });
    });

    describe('A Map', () => {

        function addMovie (state, movie) {
            return state.update('movies', movies => movies.push(movie))
        }

        it('is immutable', () => {
            let state = Map({
                movies: List.of('movie1', 'movie2')
            });

            let nextState = addMovie(state, 'movie3');

            expect(nextState).to.equal(Map({
                movies: List.of('movie1', 'movie2', 'movie3')
            }));
        });
    });
});


