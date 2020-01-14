import React from 'react';
import './App.css';
import {Router} from './components/Router';
import store from './store';
import {Provider} from 'react-redux';
import {createAuthProvider} from './hooks/tokenProvider';
import {authService} from './service/auth';


export const [useAuth, authFetch, updateToken, logout] = createAuthProvider<{ accessToken: string, refreshToken: string }>({
    accessTokenKey: 'accessToken',
    onUpdateToken: (token) => authService.updateTokens(token.refreshToken)
});

const App: React.FC = () => {

    return (
        <div className="App">
            <Provider store={store}>
                <Router/>
            </Provider>
        </div>
    );
};


export default App;
