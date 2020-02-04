import {combineReducers} from 'redux';

import boards from './boards';
import auth from './auth';
import dictionaries from './dictionaries';

const rootReducer = combineReducers({
    boards,
    auth,
    dictionaries
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;
