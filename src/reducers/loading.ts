import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {omit} from 'lodash';

export const BOARDS_LIST_LOADING = 'BOARDS_LIST_LOADING';
export const BOARD_LOADING = 'BOARD_LOADING';
export const CREATE_BOARD_LOADING = 'CREATE_BOARD_LOADING';

const loading = createSlice({
    name: 'loading',
    initialState: {} as { [key in string]: boolean },
    reducers: {
        startLoading: (state, action: PayloadAction<string>) => ({...state, [action.payload]: true}),
        finishLoading: (state, action: PayloadAction<string>) => omit(state, action.payload)
    }
});

export const {startLoading, finishLoading} = loading.actions;

export default loading.reducer;