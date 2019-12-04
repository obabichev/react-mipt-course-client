import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
} from 'react-router-dom';
import {Register} from './Register';
import {Login} from './Login';

interface RouterProps {

}

export const Router: React.FunctionComponent<RouterProps> = () => {
    return <BrowserRouter>
        <Switch>
            <Route path="/register" component={Register}/>
            <Route path="/login" component={Login}/>
            <Route path="/">
            </Route>
        </Switch>
    </BrowserRouter>;
};
