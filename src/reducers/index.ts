import {combineReducers} from 'redux';

import boards from './boards';
import board from './board';
import auth from './auth';
import dictionaries from './dictionaries';
import loading from './loading';
import modal from './modal';

const rootReducer = combineReducers({
    boards,
    board,
    auth,
    dictionaries,
    loading,
    modal
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;
