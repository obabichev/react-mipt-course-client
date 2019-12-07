import React from 'react';
import './App.css';
import {Router} from './components/Router';
import {AuthProvider} from './components/AuthProvider';

const App: React.FC = () => {

    return (
        <div className="App">
            <AuthProvider>
                <Router/>
            </AuthProvider>
        </div>
    );
};


export default App;
