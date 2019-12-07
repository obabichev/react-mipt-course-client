import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
} from 'react-router-dom';
import {Register} from './Register';
import {Login} from './Login';
import {Dashboard} from './Dashboard';

interface RouterProps {

}

export const Router: React.FunctionComponent<RouterProps> = () => {
    return <BrowserRouter>
        <Switch>
            <Route path="/register" component={Register}/>
            <Route path="/login" component={Login}/>
            <Route path="/" component={Dashboard}>
            </Route>
        </Switch>
    </BrowserRouter>;
};
