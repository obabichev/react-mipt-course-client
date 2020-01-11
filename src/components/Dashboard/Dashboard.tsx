import React, {useEffect, useState} from 'react';
import {Logout} from '../Logout';
import {useDispatch, useSelector} from 'react-redux';
import {fetchBoardsList} from '../../reducers/board';
import {BoardsTable} from './BoardsTable';
import {RootState} from '../../reducers';
import PageContainer from '../common/PageContainer';
import {Button} from '@material-ui/core';
import {CreateBoardModal} from './CreateBoardModal';

interface DashboardProps {

}

export const Dashboard: React.FunctionComponent<DashboardProps> = () => {
    const [openModal, setOpenModal] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBoardsList());
    }, []);

    const boards = useSelector((state: RootState) => state.board);

    return <PageContainer>
        <Logout/>

        <Button onClick={() => setOpenModal(true)}>Add Board</Button>

        <BoardsTable boards={boards}/>

        <CreateBoardModal open={openModal} onClose={() => setOpenModal(false)}/>
    </PageContainer>;
};
