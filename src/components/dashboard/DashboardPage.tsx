import React, {useEffect, useState} from 'react';
import {Logout} from '../auth/Logout';
import {useDispatch, useSelector} from 'react-redux';
import {fetchBoardsList} from '../../reducers/boards';
import {BoardsTable} from './BoardsTable';
import {RootState} from '../../reducers';
import PageContainer from '../common/PageContainer';
import {Button} from '@material-ui/core';
import {CreateBoardModal} from './CreateBoardModal';

interface DashboardProps {

}

export const DashboardPage: React.FunctionComponent<DashboardProps> = () => {
    const [openModal, setOpenModal] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBoardsList());
    }, [dispatch]);

    const boards = useSelector((state: RootState) => state.boards);

    return <PageContainer>
        <Logout/>

        <Button onClick={() => setOpenModal(true)}>Add Board</Button>

        <BoardsTable boards={boards}/>

        <CreateBoardModal open={openModal} onClose={() => setOpenModal(false)}/>
    </PageContainer>;
};
