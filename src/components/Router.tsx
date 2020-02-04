import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route, Redirect,
} from 'react-router-dom';
import {Register} from './auth/Register';
import {Login} from './auth/Login';
import {Dashboard} from './dashboard/Dashboard';
import {useAuth} from '../App';
import {Google} from './auth/Google';

interface RouterProps {

}

export const Router: React.FunctionComponent<RouterProps> = () => {
    const [logged] = useAuth();

    return <BrowserRouter>
        {!logged && <Switch>
            <Route path="/google" component={Google}/>
            <Route path="/register" component={Register}/>
            <Route path="/login" component={Login}/>
            <Redirect to="/login"/>
        </Switch>}
        {logged && <Switch>
            <Route path="/dashboard" component={Dashboard} exact/>
            <Redirect to="/dashboard"/>
        </Switch>}
    </BrowserRouter>;
};
