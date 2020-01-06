import React, {useEffect} from 'react';
import {Logout} from '../Logout';
import {useDispatch, useSelector} from 'react-redux';
import {fetchBoardsList} from '../../reducers/board';
import {BoardsTable} from './BoardsTable';
import {RootState} from '../../reducers';
import PageContainer from '../common/PageContainer';

interface DashboardProps {

}

export const Dashboard: React.FunctionComponent<DashboardProps> = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBoardsList());
    }, []);

    const boards = useSelector((state: RootState) => state.board);

    return <PageContainer>
        <Logout/>
        <BoardsTable boards={boards}/>
    </PageContainer>;
};
