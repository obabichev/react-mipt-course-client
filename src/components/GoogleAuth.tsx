import React, {useEffect} from 'react';
import {useGoogleAuth} from '../hooks/google';
import {useDispatch} from 'react-redux';
import {login} from '../App';

export const GoogleAuth: React.FunctionComponent<{}> = () => {

    const googleAuth = useGoogleAuth();

    const dispatch = useDispatch();

    useEffect(() => {
        if (googleAuth && googleAuth.isSignedIn()) {
            googleAuth.getTokens()
                .then(tokens => {
                    login(tokens)
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
                    login(tokens)
                })
                .catch((err: any) => console.log('err', err))
        }
    };

    return <div>
        <div className="g-signin2" data-onsuccess="" onClick={actGoogleAuth}/>
    </div>;
};