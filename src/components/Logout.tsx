import React from 'react';
import {Button} from '@material-ui/core';
import {useGoogleAuth} from '../hooks/google';
import {useDispatch} from 'react-redux';
import {logoutAction} from '../reducers/auth';

export const Logout: React.FunctionComponent<{}> = () => {
    const googleAuth = useGoogleAuth();

    const dispatch = useDispatch();

    const onClick = () => {
        if (googleAuth && googleAuth.isSignedIn()) {
            googleAuth.signOut()
                .then(() => dispatch(logoutAction()));
        } else {
            dispatch(logoutAction());
        }
    };

    return <div>
        <Button onClick={onClick}>Logout</Button>
    </div>
};
