import {Tokens} from '../types';

export const getAccessToken = (): Tokens => {
    return JSON.parse(localStorage.getItem('AUTH_TOKENS') || '')?.token || null;
};