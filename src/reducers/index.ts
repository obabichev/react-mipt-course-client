import {combineReducers} from 'redux';

import boards from './boards';
import board from './board';
import auth from './auth';
import dictionaries from './dictionaries';

const rootReducer = combineReducers({
    boards,
    board,
    auth,
    dictionaries
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;
