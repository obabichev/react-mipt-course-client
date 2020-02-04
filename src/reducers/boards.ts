import {createSlice, Dispatch, PayloadAction} from '@reduxjs/toolkit';
import {Board} from '../types';
import {RootState} from './index';
import {authFetch} from '../App';

const boards = createSlice({
    name: 'boards',
    initialState: [] as Board[],
    reducers: {
        boardsList: ((state, action: PayloadAction<Board[]>) => action.payload)
    }
});

export const {boardsList} = boards.actions;

export const fetchBoardsList = () => (dispatch: Dispatch) => {
    fetch('/board')
        .then(r => r.json())
        .then(data => {
            dispatch(boardsList(data));
        })
        .catch(error => {
            console.log('error', error);
        })
};

export const createBoard = (board: Partial<Board>) => (dispatch: Dispatch, getState: () => RootState) => {
    authFetch('/board', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(board)
    })
        .then(r => {
            if (r.status !== 200) {
                throw r.statusText;
            }
            return r.json()
        })
        .then(data => {
            const boards = getState().boards;
            dispatch(boardsList([...boards, data]));
        })
        .catch(error => {
            console.log('error', error);
        })
};

export default boards.reducer;