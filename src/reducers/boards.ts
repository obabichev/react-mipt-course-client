import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Board} from '../types';
import {BOARDS_LIST_LOADING, CREATE_BOARD_LOADING} from './loading';
import {closeModal, CREATE_BOARD_MODAL} from './modal';
import {errorThunk} from '../utils/errorThunk';
import {loadingThunk} from '../utils/loadingThunk';
import {boardService} from '../service/board';

const boards = createSlice({
    name: 'boards',
    initialState: [] as Board[],
    reducers: {
        boardsList: ((state, action: PayloadAction<Board[]>) => action.payload),
        newBoard: ((state, action: PayloadAction<Board>) => [...state, action.payload])
    }
});

export const {boardsList, newBoard} = boards.actions;

export const fetchBoardsList = () => errorThunk(loadingThunk(BOARDS_LIST_LOADING)(
    dispatch => boardService.boards()
        .then(boards => dispatch(boardsList(boards)))
));

export const createBoard = (board: Partial<Board>) => errorThunk(loadingThunk(CREATE_BOARD_LOADING)(
    dispatch => boardService.postBoard(board).then(board => {
        dispatch(newBoard(board));
        dispatch(closeModal(CREATE_BOARD_MODAL));
    })
));

export default boards.reducer;