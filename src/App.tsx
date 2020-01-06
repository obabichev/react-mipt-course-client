import React from 'react';
import './App.css';
import {Router} from './components/Router';
import store from './store';
import {Provider} from 'react-redux';


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
