import {wrapFetch} from '../utils/wrapFetch';
import {Board} from '../types';
import {authFetch} from '../App';

const boards = async () => wrapFetch(fetch)('/board');

const board = (boardId: string) => wrapFetch(fetch)(`/board/${boardId}`);

const postBoard = async (board: Partial<Board>) => {
    return wrapFetch(authFetch)('/board', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(board)
    })
};

export const boardService = {
    boards,
    board,
    postBoard
};