import {AnyAction, createSlice, Dispatch, PayloadAction, ThunkAction} from '@reduxjs/toolkit';
import {Board} from '../types';
import {RootState} from './index';
import {authFetch} from '../App';
import {startLoading, finishLoading, BOARDS_LIST_LOADING, CREATE_BOARD_LOADING} from './loading';
import {closeModal, CREATE_BOARD_MODAL} from './modal';
import {wrapFetch} from '../utils/wrapFetch';
import {ThunkResult} from './types';
import {errorThunk} from '../utils/errorThunk';
import {loadingThunk} from '../utils/loadingThunk';
import {boardService} from '../service/board';

const boards = createSlice({
    name: 'boards',
    initialState: [] as Board[],
    reducers: {
        boardsList: ((state, action: PayloadAction<Board[]>) => action.payload)
    }
});

export const {boardsList} = boards.actions;

export const fetchBoardsList = () => errorThunk(loadingThunk(BOARDS_LIST_LOADING)(
    (dispatch: Dispatch) => {
        return boardService.boards()
            .then(boards => dispatch(boardsList(boards)))
    }
));

export const createBoard = (board: Partial<Board>) => errorThunk((dispatch: Dispatch, getState: () => RootState) => {
    dispatch(startLoading(CREATE_BOARD_LOADING));
    return wrapFetch(authFetch)('/board', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(board)
    })
        .then(data => {
            const boards = getState().boards;
            dispatch(boardsList([...boards, data]));
            dispatch(closeModal(CREATE_BOARD_MODAL))
        })
        .finally(() => {
            dispatch(finishLoading(CREATE_BOARD_LOADING));
        })
});

export default boards.reducer;