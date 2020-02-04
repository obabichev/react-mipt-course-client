import React from 'react';
import {Redirect, RouteComponentProps} from 'react-router';

export const BoardPage: React.FunctionComponent<RouteComponentProps<{ id?: string }>> = (props) => {
    const id = props.match.params.id;

    if (!id) {
        return <Redirect to={'/'}/>;
    }

    return <div>
        Board
    </div>
};
