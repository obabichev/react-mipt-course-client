import React, {useEffect} from 'react';
import {Logout} from '../auth/Logout';
import {useDispatch, useSelector} from 'react-redux';
import {fetchBoardsList} from '../../reducers/boards';
import {BoardsTable} from './BoardsTable';
import {RootState} from '../../reducers';
import PageContainer from '../common/PageContainer';
import {Button} from '@material-ui/core';
import {useModalRender} from '../../hooks/useModalRender';
import {useLoading} from '../../hooks/useLoading';
import {BOARDS_LIST_LOADING} from '../../reducers/loading';
import {CREATE_BOARD_MODAL} from '../../reducers/modal';

interface DashboardProps {

}

export const DashboardPage: React.FunctionComponent<DashboardProps> = () => {
    const modal = useModalRender(CREATE_BOARD_MODAL);
    const isLoading = useLoading([BOARDS_LIST_LOADING]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBoardsList());
    }, [dispatch]);

    const boards = useSelector((state: RootState) => state.boards);

    return <PageContainer loading={isLoading}>
        <Logout/>

        {modal(open => <Button onClick={open}>Add Board</Button>)}

        <BoardsTable boards={boards}/>
    </PageContainer>;
};
