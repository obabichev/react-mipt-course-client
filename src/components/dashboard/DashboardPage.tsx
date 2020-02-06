import React, {useEffect, useState} from 'react';
import {Logout} from '../auth/Logout';
import {useDispatch, useSelector} from 'react-redux';
import {fetchBoardsList} from '../../reducers/boards';
import {BoardsTable} from './BoardsTable';
import {RootState} from '../../reducers';
import PageContainer from '../common/PageContainer';
import {Button} from '@material-ui/core';
import {CreateBoardModal} from './CreateBoardModal';
import {useModalRender} from '../../hooks/useModalRender';

interface DashboardProps {

}

export const DashboardPage: React.FunctionComponent<DashboardProps> = () => {
    const modal = useModalRender();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBoardsList());
    }, [dispatch]);

    const boards = useSelector((state: RootState) => state.boards);

    return <PageContainer>
        <Logout/>

        {modal(
            <CreateBoardModal/>,
            open => <Button onClick={open}>Add Board</Button>
        )}

        <BoardsTable boards={boards}/>
    </PageContainer>;
};
