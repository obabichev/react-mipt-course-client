import {Tokens, User} from '../types';

const register = (credentials: { name: string, email: string, password: string; }): Promise<{ user: User, token: Tokens }> => {
    return fetch('/auth/register', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(response => response.json());
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
    updateTokens
};
