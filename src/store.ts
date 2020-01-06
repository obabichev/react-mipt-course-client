import {configureStore} from '@reduxjs/toolkit'
import rootReducer from './reducers'
import thunk from 'redux-thunk';

const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: [thunk.withExtraArgument({})]
});

export default store