import {useEffect, useState} from 'react';

export type AuthProviderConfig<T> = {
    onUpdateToken?: (token: T) => Promise<T | null>;
    localStorageKey?: string;
    accessTokenKey?: string;
    accessTokenExpireField?: string;
};

export const createAuthProvider = <T>({
                                          onUpdateToken,
                                          localStorageKey = 'REACT_TOKEN_AUTH_KEY',
                                          accessTokenKey,
                                          accessTokenExpireField
                                      }: AuthProviderConfig<T>) => {
    const localStorageData = localStorage.getItem(localStorageKey);

    const tp = createTokenProvider({
        initToken: localStorageData && JSON.parse(localStorageData) || null,
        localStorageKey,
        accessTokenKey,
        accessTokenExpireField,
        onUpdateToken
    });

    let listeners: ((newLogged: boolean) => void)[] = [];

    const notify = () => {
        const isLogged = tp.isLoggedIn();
        listeners.forEach(l => l(isLogged));
    };

    const subscribe = (listener: (logged: boolean) => void) => {
        listeners.push(listener);
    };

    const unsubscribe = (listener: (logged: boolean) => void) => {
        listeners = listeners.filter(l => l !== listener);
    };

    const updateToken = (newTokens: T) => {
        tp.setToken(newTokens);
        notify();
    };

    const logout = () => {
        tp.setToken(null);
        notify();
    };

    const authFetch = async (input: RequestInfo, init?: RequestInit): Promise<Response> => {
        const token = await tp.getToken();

        if (!token) {
            notify();
        }

        init = init || {};

        init.headers = {
            ...init.headers,
            Authorization: `Bearer ${token}`
        };

        return fetch(input, init);
    };

    const useAuth = () => {
        const [isLogged, setIsLogged] = useState(tp.isLoggedIn());

        const listener = (newIsLogged: boolean) => {
            setIsLogged(newIsLogged);
        };

        useEffect(() => {
            subscribe(listener);
            return () => {
                unsubscribe(listener);
            }
        }, [listener]);

        return [isLogged] as [typeof isLogged];
    };

    return [useAuth, authFetch, updateToken, logout] as [typeof useAuth, typeof authFetch, typeof updateToken, typeof logout];
};

type TokenProviderConfig<T> = {
    initToken: T | null;
    localStorageKey: string;
    accessTokenKey?: string;
    accessTokenExpireField?: string;
    onUpdateToken?: (token: T) => Promise<T | null>;
}

const createTokenProvider = <T>({initToken, localStorageKey, accessTokenKey, accessTokenExpireField, onUpdateToken}: TokenProviderConfig<T>) => {
    let _token = initToken;

    const jwtExp = (token?: any): number | null => {
        if (!(typeof token === 'string')) {
            return null;
        }

        const split = token.split('.');

        if (split.length < 2) {
            return null;
        }

        try {
            const jwt = JSON.parse(atob(token.split('.')[1]));
            if (jwt && jwt.exp && Number.isFinite(jwt.exp)) {
                return jwt.exp * 10000;
            } else {
                return null;
            }
        } catch (e) {
            return null;
        }

    };

    const getExpire = (token: T | null) => {
        if (!token) {
            return null;
        }

        if (accessTokenExpireField) {
            // @ts-ignore
            return token[accessTokenExpireField]
        }

        if (accessTokenKey) {
            // @ts-ignore
            const exp = jwtExp(token[accessTokenKey]);
            if (exp) {
                return exp;
            }
        }

        return jwtExp(token);
    };

    const isExpired = (exp?: number) => {
        if (!exp) {
            return false;
        }

        return Date.now() > exp - 10000;
    };

    const checkExpiry = async () => {
        if (_token && isExpired(getExpire(_token))) {
            const newToken = onUpdateToken ? await onUpdateToken(_token) : null;

            if (newToken) {
                _token = newToken;
            } else {
                localStorage.removeItem(localStorageKey);
                _token = null;
            }
        }
    };

    const getToken = async () => {
        await checkExpiry();

        if (accessTokenKey) {
            // @ts-ignore
            return _token[accessTokenKey];
        }

        return _token;
    };

    const isLoggedIn = () => {
        // await checkExpiry();
        return !!_token
    };

    const setToken = (token: T | null) => {
        if (token) {
            localStorage.setItem(localStorageKey, JSON.stringify(token));
        } else {
            localStorage.removeItem(localStorageKey);
        }
        _token = token;
    };

    return {
        getToken,
        isLoggedIn,
        setToken
    }
};
