import {createSlice, Dispatch, PayloadAction} from '@reduxjs/toolkit';
import {Board} from '../types';

const board = createSlice({
    name: 'board',
    initialState: null as Board | null,
    reducers: {
        boardAction: ((state, action: PayloadAction<Board>) => action.payload)
    }
});

export const {boardAction} = board.actions;

export const fetchBoard = (boardId: string) => (dispatch: Dispatch) => {
    console.log('[obabichev] fetch board', boardId);
    fetch(`/board/${boardId}`)
        .then(r => r.json())
        .then(data => {
            dispatch(boardAction(data));
        })
        .catch(error => {
            console.log('error', error);
        })
};

export default board.reducer;