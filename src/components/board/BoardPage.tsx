import React from 'react';
import {RouteComponentProps} from 'react-router';
import {useBoard} from '../../hooks/useBoard';
import {Backlog} from './Backlog';

export const BoardPage: React.FunctionComponent<RouteComponentProps<{ id?: string }>> = (props) => {
    const id = props.match.params.id;

    const [board] = useBoard(id);

    console.log('[obabichev] board', board);

    return <div>
        Board
        <Backlog/>
    </div>
};
