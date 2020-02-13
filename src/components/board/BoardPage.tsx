import React from 'react';
import {RouteComponentProps} from 'react-router';
import {useBoard} from '../../hooks/useBoard';
import {Backlog} from './Backlog';
import PageContainer from '../common/PageContainer';

export const BoardPage: React.FunctionComponent<RouteComponentProps<{ id?: string }>> = (props) => {
    const id = props.match.params.id;

    const [board] = useBoard(id);

    console.log('[obabichev] board', board);

    if (!id || !board) {
        return <div>404....</div>
    }

    return <div>
        <PageContainer>
            Board
            <Backlog board={board}/>
        </PageContainer>
    </div>
};
