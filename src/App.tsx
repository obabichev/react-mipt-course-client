import React from 'react';
import './App.css';
import {Router} from './components/Router';
import {AuthProvider} from './components/AuthProvider';
import store from './store';
import {Provider} from 'react-redux';


const App: React.FC = () => {

    return (
        <div className="App">
            <Provider store={store}>
                <AuthProvider>
                    <Router/>
                </AuthProvider>
            </Provider>
        </div>
    );
};


export default App;
