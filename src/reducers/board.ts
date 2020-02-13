import {createSlice, Dispatch, PayloadAction} from '@reduxjs/toolkit';
import {Board, Task} from '../types';
import {authFetch} from '../App';

const board = createSlice({
    name: 'board',
    initialState: null as Board | null,
    reducers: {
        boardAction: ((state, action: PayloadAction<Board>) => action.payload),
        createdTask: ((state, action: PayloadAction<Task>) => {
            if (!state) {
                return state;
            }
            return {
                ...state,
                tasks: [...state.tasks, action.payload]
            }
        })
    }
});

export const {boardAction, createdTask} = board.actions;

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

export const createTask = (task: Partial<Task> & { boardId: string, parentTaskId?: string }) => (dispatch: Dispatch) => {
    authFetch('/task', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(task)
    })
        .then(r => r.json())
        .then(task => {
            dispatch(createdTask(task));
        })
};

export default board.reducer;