import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../reducers';
import {useEffect} from 'react';
import {fetchBoard} from '../reducers/board';

export const useBoard = (boardId?: string) => {
    const board = useSelector((state: RootState) => state.board);
    const dispatch = useDispatch();

    console.log('[obabichev] board', board);

    useEffect(() => {
        if (boardId) {
            dispatch(fetchBoard(boardId));
        }
    }, [boardId, dispatch]);

    return [board];
};
