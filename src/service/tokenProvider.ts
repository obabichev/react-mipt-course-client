import {Tokens} from '../types';
import {authService} from './auth';

export const createTokenProvider = (initTokens: Tokens | null = null) => {
    console.log('[obabichev] createTokenProvider.initTokens', initTokens);

    let _tokens: Tokens | null = initTokens;

    function isAccessTokenExpire() {
        return _tokens && _tokens.accessTokenExpiresIn > Date.now() - 10000;
    }

    function isRefreshTokenExpire() {
        return _tokens && _tokens.refreshTokenExpiresIn > Date.now() - 10000;
    }

    function isLoggedIn() {
        return _tokens && !isRefreshTokenExpire();
    }

    function setTokens(tokens: Tokens) {
        console.log('[obabichev] createTokenProvider::setTokens.tokens', tokens);
        _tokens = tokens;
        localStorage.setItem('AUTH_TOKENS', JSON.stringify(tokens));
    }

    async function updateTokens(refreshToken: string) {
        _tokens = await authService.updateTokens(refreshToken);
    }

    async function getAccessToken() {
        if (!_tokens) {
            return null;
        }

        if (isRefreshTokenExpire()) {
            _tokens = null;
            return null;
        }

        if (isAccessTokenExpire()) {
            await updateTokens(_tokens.refreshToken);
        }

        return _tokens.accessToken;
    }

    return {
        getAccessToken,
        isLoggedIn,
        setTokens
    }
};
