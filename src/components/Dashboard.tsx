import React from 'react';
import {Button} from '@material-ui/core';
import {useAuthContext} from './AuthProvider';

interface DashboardProps {

}

export const Dashboard: React.FunctionComponent<DashboardProps> = () => {
    const {logout} = useAuthContext();

    return <div>
        <Button variant="contained" onClick={logout}>Logout</Button>
        Dashboard
    </div>;
};
