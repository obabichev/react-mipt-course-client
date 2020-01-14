import React from 'react';
import {Button} from '@material-ui/core';
import {useGoogleAuth} from '../hooks/google';
import {logout} from '../App';

export const Logout: React.FunctionComponent<{}> = () => {
    const googleAuth = useGoogleAuth();

    const onClick = () => {
        if (googleAuth && googleAuth.isSignedIn()) {
            googleAuth.signOut()
                .then(logout);
        } else {
            logout();
        }
    };

    return <div>
        <Button onClick={onClick}>Logout</Button>
    </div>
};
