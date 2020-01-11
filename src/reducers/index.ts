import {combineReducers} from 'redux';

import board from './board';
import auth from './auth';
import dictionaries from './dictionaries';

const rootReducer = combineReducers({
    board,
    auth,
    dictionaries
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;
