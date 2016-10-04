/**
 * Created by tmrovsky on 04.10.2016.
 */

import {createStore} from 'redux';
import reducer from './reducer';

export default function makeStore () {
    return createStore(reducer);
}
