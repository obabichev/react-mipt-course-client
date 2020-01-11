import {createSlice, Dispatch, PayloadAction} from '@reduxjs/toolkit';
import {Board} from '../types';
import {getAccessToken} from '../utils/localStorage';
import {tokenProvider} from '../hooks/tokenProvider';
import {RootState} from './index';

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
            dispatch(boardsList(data));
        })
        .catch(error => {
            console.log('[obabichev] error', error);
        })
};

export const createBoard = (board: Partial<Board>) => (dispatch: Dispatch, getState: () => RootState) => {
    const tokens = getAccessToken();

    if (!tokens) {
        console.error('NO TOKENS');
    }

    tokenProvider(tokens).getAccessToken()
        .then(accessToken => {
            return fetch('/board', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify(board)
            })
        })
        .then(r => {
            if (r.status !== 200) {
                throw r.statusText;
            }
            return r.json()
        })
        .then(data => {
            const boards = getState().board;
            dispatch(boardsList([...boards, data]));
        })
        .catch(error => {
            console.log('[obabichev] error', error);
        })
};

export default board.reducer;