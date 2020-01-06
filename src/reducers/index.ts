import {combineReducers} from 'redux';

import board from './board';
import auth from './auth';

const rootReducer = combineReducers({
    board,
    auth
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;
