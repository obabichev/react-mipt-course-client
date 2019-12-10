import React from 'react';
import {Button} from '@material-ui/core';
import {useAuthContext} from './AuthProvider';
import {useGoogleAuth} from '../hooks/google';

export const Logout: React.FunctionComponent<{}> = () => {
    const {logout} = useAuthContext();

    const googleAuth = useGoogleAuth();

    const onClick = () => {
        if (googleAuth && googleAuth.isSignedIn()) {
            googleAuth.signOut()
                .then(() => logout());
        } else {
            logout();
        }
    };

    return <div>
        <Button onClick={onClick}>Logout</Button>
    </div>
};
