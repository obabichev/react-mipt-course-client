import {createSlice, Dispatch, PayloadAction} from '@reduxjs/toolkit';
import {Board, DetailedBoard, Task} from '../types';
import {authFetch} from '../App';

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
        boardAction: ((state, action: PayloadAction<DetailedBoard>) => {
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
        .then(board => {
            dispatch(boardAction(board));
        })
};

export default board.reducer;