import {wrapFetch} from '../utils/wrapFetch';

const boards = async() => {
    return wrapFetch(fetch)('/board')
};

export const boardService = {
    boards
};