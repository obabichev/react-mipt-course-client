import {createSlice, Dispatch, PayloadAction} from '@reduxjs/toolkit';
import {Board} from '../types';

const board = createSlice({
    name: 'board',
    initialState: [] as Board[],
    reducers: {
        boardsList: ((state, action: PayloadAction<Board[]>) => action.payload)
    }
});

export const {boardsList} = board.actions;

export const fetchBoardsList = () => (dispatch: Dispatch) => {
    fetch('/board')
        .then(r => r.json())
        .then(data => {
            console.log('[obabichev] data', data);
            dispatch(boardsList(data));
        })
        .catch(error => {
            console.log('[obabichev] error', error);
        })
};

export default board.reducer;