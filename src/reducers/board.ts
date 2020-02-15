import {createSlice, Dispatch, PayloadAction} from '@reduxjs/toolkit';
import {Board, DetailedBoard, Task} from '../types';
import {authFetch} from '../App';
import {BOARD_LOADING, CREATE_TASK_LOADING, finishLoading, startLoading} from './loading';
import {closeModal, CREATE_TASK_MODAL} from './modal';

const normalizeTasks = (tasks?: Task[]) => {
    if (!tasks) {
        return {};
    }

    return tasks.reduce((result, task) => ({
        ...result,
        [task._id]: task
    }), {} as { [key in string]: Task })
};

const board = createSlice({
    name: 'board',
    initialState: null as { board: Board, tasks: { [key in string]: Task } } | null,
    reducers: {
        boardAction: ((state, action: PayloadAction<DetailedBoard | null>) => {
            if (!action.payload) {
                return null;
            }
            return {
                board: {
                    ...action.payload,
                    tasks: action.payload.tasks
                        .filter(task => !task.parent)
                        .map(task => task._id)
                },
                tasks: normalizeTasks(action.payload.tasks)
            }
        }),
        /*createdTask: ((state, action: PayloadAction<DetailedBoard>) => {
            if (!state) {
                return state;
            }
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [action.payload._id]: action.payload
                }
            }

            // return {
            //     ...state,
            //     tasks: [...state.tasks, action.payload]
            // }
        })*/
    }
});

export const {boardAction} = board.actions;

export const fetchBoard = (boardId: string) => (dispatch: Dispatch) => {
    dispatch(startLoading(BOARD_LOADING));
    dispatch(boardAction(null));
    fetch(`/board/${boardId}`)
        .then(r => r.json())
        .then(data => {
            dispatch(boardAction(data));
        })
        .catch(error => {
            console.log('error', error);
        })
        .finally(() => {
            dispatch(finishLoading(BOARD_LOADING))
        })
};

export const createTask = (task: Partial<Task> & { boardId: string, parentTaskId?: string }) => (dispatch: Dispatch) => {
    dispatch(startLoading(CREATE_TASK_LOADING));
    authFetch('/task', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(task)
    })
        .then(r => r.json())
        .then(board => {
            dispatch(boardAction(board));
            dispatch(closeModal(CREATE_TASK_MODAL))
        })
        .finally(() => {
            dispatch(finishLoading(CREATE_TASK_LOADING))
        })
};

export default board.reducer;