import {combineReducers} from 'redux';

import boards from './boards';
import board from './board';
import auth from './auth';
import dictionaries from './dictionaries';
import loading from './loading';
import modal from './modal';
import error from './error';

const rootReducer = combineReducers({
    boards,
    board,
    auth,
    dictionaries,
    loading,
    modal,
    error
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;
