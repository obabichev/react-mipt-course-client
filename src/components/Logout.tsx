import React from 'react';
import {Button} from '@material-ui/core';
import {logout} from '../App';

export const Logout: React.FunctionComponent<{}> = () => {

    const onClick = () => {
        logout();
    };

    return <div>
        <Button onClick={onClick}>Logout</Button>
    </div>
};
