import {useSelector} from 'react-redux';
import {RootState} from '../reducers';

export const useBoard = (boardId: string) => {
    const board = useSelector((state: RootState) => state.boards);
};
