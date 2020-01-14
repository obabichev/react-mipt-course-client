import React, {useEffect} from 'react';
import {useGoogleAuth} from '../hooks/google';
import {useDispatch} from 'react-redux';
import {loginAction} from '../reducers/auth';
import {updateToken} from '../App';

export const GoogleAuth: React.FunctionComponent<{}> = () => {

    const googleAuth = useGoogleAuth();

    const dispatch = useDispatch();

    useEffect(() => {
        if (googleAuth && googleAuth.isSignedIn()) {
            googleAuth.getTokens()
                .then(tokens => {
                    // localStorage.setItem('AUTH_TOKENS', JSON.stringify(tokens));
                    updateToken(tokens)
                    // dispatch(loginAction(tokens.user))
                });
        }
    }, [googleAuth]);


    const actGoogleAuth = (e: any) => {

        if (e) {
            e.preventDefault();
        }

        if (googleAuth) {
            googleAuth.signIn()
                .then((tokens) => {
                    updateToken(tokens)
                })
                .catch((err: any) => console.log('err', err))
        }
    };

    return <div>
        <div className="g-signin2" data-onsuccess="" onClick={actGoogleAuth}/>
    </div>;
};