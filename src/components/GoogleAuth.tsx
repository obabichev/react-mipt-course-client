import React, {useEffect} from 'react';
import {useAuthContext} from './AuthProvider';
import {useGoogleAuth} from '../hooks/google';

export const GoogleAuth: React.FunctionComponent<{}> = () => {

    const {setTokens} = useAuthContext();

    const googleAuth = useGoogleAuth();

    useEffect(() => {
        if (googleAuth && googleAuth.isSignedIn()) {
            googleAuth.getTokens()
                .then(tokens => setTokens(tokens.token));
        }
    }, [googleAuth]);


    const actGoogleAuth = (e: any) => {

        if (e) {
            e.preventDefault();
        }

        if (googleAuth) {
            googleAuth.signIn()
                .then((tokens) => setTokens(tokens.token))
                .catch((err: any) => console.log('[obabichev] onError2', err))
        }
    };

    return <div>
        <div className="g-signin2" data-onsuccess="" onClick={actGoogleAuth}/>
    </div>;
};