import {Tokens} from '../types';
import {authService} from '../service/auth';

export const tokenProvider = (initTokens: Tokens | null = null) => {
    // const [_tokens, _setTokens] = useState(initTokens);
    let _tokens = initTokens;

    const _setTokens = (tokens: Tokens | null) => {
        _tokens = tokens;
    };

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
        _setTokens(tokens);
        localStorage.setItem('AUTH_TOKENS', JSON.stringify(tokens));
    }

    async function updateTokens(refreshToken: string) {
        const tokens = await authService.updateTokens(refreshToken);

        console.log('[obabichev] new tokens', tokens);

        _setTokens(tokens);
    }

    async function getAccessToken() {
        console.log('[obabichev] 1 _tokens', _tokens);
        if (!_tokens) {
            return null;
        }

        if (isRefreshTokenExpire()) {
            console.log('[obabichev] refresh expired', 123);
            _setTokens(null);
            return null;
        }

        if (isAccessTokenExpire()) {
            console.log('[obabichev] access expired', 234);
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
