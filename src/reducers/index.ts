import {combineReducers} from 'redux';

import {board} from './board.reducer';

const rootReduce = combineReducers({
    board
});

export default rootReduce;
