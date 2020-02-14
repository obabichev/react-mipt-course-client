import React from 'react';
import {RouteComponentProps} from 'react-router';

export const TaskPage: React.FunctionComponent<RouteComponentProps<{ key?: string }>> = (props) => {
    const key = props.match.params.key;

    return <div>
        {key}
    </div>
};