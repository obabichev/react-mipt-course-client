import React from 'react';
import {useAuthContext} from './AuthProvider';
import {Logout} from './Logout';

interface DashboardProps {

}

export const Dashboard: React.FunctionComponent<DashboardProps> = () => {
    const {logout} = useAuthContext();

    return <div>
        <Logout/>
        Dashboard
    </div>;
};
