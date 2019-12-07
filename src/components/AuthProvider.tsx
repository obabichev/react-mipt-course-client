import React, {createContext, useContext} from 'react';
import {useTokenProvider} from '../hooks/tokenProvider';

type IAuthContext = ReturnType<typeof useTokenProvider>;

export const AuthContext: React.Context<IAuthContext> = createContext({} as IAuthContext);

export const AuthProvider: React.FunctionComponent<{}> = ({children}) => {
    const tokens = localStorage.getItem('AUTH_TOKENS');

    const tokenProvider = useTokenProvider(tokens && tokens !== 'undefined' && JSON.parse(tokens));

    return <AuthContext.Provider value={tokenProvider}>
        {children}
    </AuthContext.Provider>
};

export const useAuthContext = () => useContext(AuthContext);