import {Tokens} from '../types';
import {authService} from '../service/auth';
import {useState} from 'react';

export const useTokenProvider = (initTokens: Tokens | null = null) => {
    console.log('[obabichev] useTokenProvider.initTokens', initTokens);

    const [_tokens, _setTokens] = useState(initTokens);

    function isAccessTokenExpire() {
        return _tokens && Date.now() > _tokens.accessTokenExpiresIn - 10000;
    }

    function isRefreshTokenExpire() {
        if (_tokens)
        return _tokens && Date.now() > _tokens.refreshTokenExpiresIn - 10000;
    }

    function isLoggedIn() {
        return _tokens && !isRefreshTokenExpire();
    }

    function setTokens(tokens: Tokens) {
        console.log('[obabichev] useTokenProvider::_setTokens.tokens', tokens);
        _setTokens(tokens);
        localStorage.setItem('AUTH_TOKENS', JSON.stringify(tokens));
    }

    async function updateTokens(refreshToken: string) {
        const tokens = await authService.updateTokens(refreshToken);

        _setTokens(tokens);
    }

    async function getAccessToken() {
        if (!_tokens) {
            return null;
        }

        if (isRefreshTokenExpire()) {
            _setTokens(null);
            return null;
        }

        if (isAccessTokenExpire()) {
            await updateTokens(_tokens.refreshToken);
        }

        return _tokens.accessToken;
    }

    function logout() {
        _setTokens(null);
        localStorage.removeItem('AUTH_TOKENS');
    }

    return {
        getAccessToken,
        isLoggedIn,
        setTokens,
        logout
    }
};
