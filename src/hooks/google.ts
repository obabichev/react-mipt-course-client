import {Tokens, User} from '../types';
import {useEffect, useState} from 'react';
import {authService} from '../service/auth';

export const useGoogleAuth = () => {
    const [googleAuth, setGoogleAuth] = useState<{
        isSignedIn: () => boolean,
        getTokens: () => Promise<{ user: User, token: Tokens }>,
        signIn: () => Promise<{ user: User, token: Tokens }>,
        signOut: () => Promise<void>
    } | null>(null);

    const googleAuthToState = (res: any) => {
        const isSignedIn = () => res.isSignedIn.get();

        const getTokens = () => {
            if (res.isSignedIn.get()) {
                const user = res.currentUser.get();

                return authService.loginByGoogleIdToken(user.getAuthResponse().id_token);
            } else {
                throw new Error('User is not signed in');
            }
        };

        const signIn = () => res.signIn({})
            .then((res: any) => {
                return authService.loginByGoogleIdToken(res.getAuthResponse().id_token);
            });

        const signOut = () => res.signOut();

        setGoogleAuth({
            isSignedIn,
            getTokens,
            signIn,
            signOut
        });
    };

    // @ts-ignore
    useEffect(() => {
        // @ts-ignore
        if (window.gapi) {
            // @ts-ignore
            window.gapi.load('auth2', () => {
                const params = {
                    client_id: '416520824005-i7rgnt5fcm7rd12av7p7h70ndvnmjodp.apps.googleusercontent.com',
                };

                // @ts-ignore
                if (!window.gapi.auth2.getAuthInstance()) {
                    // @ts-ignore
                    window.gapi.auth2.init(params)
                        .then((res: any) => {
                            googleAuthToState(res);
                        })
                        .catch((err: any) => {
                            console.log('[obabichev] err', err);
                        })
                } else {
                    //@ts-ignore
                    googleAuthToState(window.gapi.auth2.getAuthInstance());
                }
            });
        }
        //@ts-ignore
    }, [window.gapi]);

    return googleAuth;
};

