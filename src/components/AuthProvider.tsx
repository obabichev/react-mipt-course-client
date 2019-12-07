import React, {createContext, useContext} from 'react';
import {createTokenProvider} from '../service/tokenProvider';

type IAuthContext = ReturnType<typeof createTokenProvider>;

export const AuthContext: React.Context<IAuthContext> = createContext(createTokenProvider());

export const AuthProvider: React.FunctionComponent<{}> = ({children}) => {
    const tokens = localStorage.getItem('AUTH_TOKENS');

    return <AuthContext.Provider value={createTokenProvider(tokens && JSON.parse(tokens))}>
        {children}
    </AuthContext.Provider>
};

export const useAuthContext = () => useContext(AuthContext);