import {Tokens, User} from '../types';

const register = async (credentials: { name: string, email: string, password: string; }): Promise<{ user: User, token: Tokens }> => {
    const response = await fetch('/auth/register', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(credentials)
    });

    if (response.status !== 200) {
        throw new Error(await response.json());
    }

    return response.json();
};

const login = async (credentials: { email: string, password: string; }) => {
    const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(credentials)
    });

    if (response.status !== 200) {
        throw new Error(await response.json());
    }

    return response.json();
};

const updateTokens = (refreshToken: string) => {
    return fetch('/auth/update-tokens', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({refreshToken})
    })
        .then(response => response.json());
};

export const authService = {
    register,
    login,
    updateTokens
};
