import React from 'react';
import './App.css';
import {Router} from './components/Router';
import store from './store';
import {Provider} from 'react-redux';
import {authService} from './service/auth';
import {createAuthProvider} from 'react-token-auth';


export const [useAuth, authFetch, login, logout] =
    createAuthProvider<{ accessToken: string, refreshToken: string }>({
        accessTokenKey: 'accessToken',
        onUpdateToken: (token) => {
            return authService.updateTokens(token.refreshToken)
        }
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
