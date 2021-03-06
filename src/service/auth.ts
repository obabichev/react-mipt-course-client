import {Tokens} from '../types';

const register = async (credentials: { name: string, email: string, password: string; }): Promise<Tokens> => {
    const response = await fetch('/auth/register', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(credentials)
    });

    if (response.status !== 200) {
        throw await response.json();
    }

    return response.json();
};

const login = async (credentials: { email: string, password: string; }): Promise<Tokens> => {
    const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(credentials)
    });

    if (response.status !== 200) {
        throw await response.json();
    }

    return response.json();
};

const updateTokens = (refreshToken: string): Promise<Tokens> => {
    return fetch('/auth/update-tokens', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({refreshToken})
    })
        .then(response => response.json());
};

const loginByGoogleIdToken = (idToken: string): Promise<Tokens> => {
    return fetch('/auth/google', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id_token: idToken})
    })
        .then(response => response.json());
};

export const authService = {
    register,
    login,
    updateTokens,
    loginByGoogleIdToken
};
