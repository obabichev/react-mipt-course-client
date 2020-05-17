import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Board, DetailedBoard, Task} from '../types';
import {BOARD_LOADING} from './loading';
import {closeModal, CREATE_TASK_MODAL} from './modal';
import {errorThunk} from '../utils/errorThunk';
import {loadingThunk} from '../utils/loadingThunk';
import {boardService} from '../service/board';
import {taskService} from '../service/task';

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
    }
});

export const {boardAction} = board.actions;

export const fetchBoard = (boardId: string) => errorThunk(loadingThunk(BOARD_LOADING)(
    dispatch => boardService.board(boardId).then(board => dispatch(boardAction(board)))
));

export const createTask = (task: Partial<Task> & { boardId: string, parentTaskId?: string }) =>
    errorThunk(loadingThunk(BOARD_LOADING)(
        (dispatch) => taskService.postTask(task).then(board => {
            dispatch(boardAction(board));
            dispatch(closeModal(CREATE_TASK_MODAL))
        })
    ));

export default board.reducer;