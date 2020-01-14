import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route, Redirect,
} from 'react-router-dom';
import {Register} from './Register';
import {Login} from './Login';
import {Dashboard} from './Dashboard/Dashboard';
import {useAuth} from '../App';

interface RouterProps {

}

export const Router: React.FunctionComponent<RouterProps> = () => {
    const [logged] = useAuth();

    return <BrowserRouter>
        <Switch>
            {!logged && <>
                <Route path="/register" component={Register}/>
                <Route path="/login" component={Login}/>
                <Redirect to="/login"/>
            </>}
            {logged && <>
                <Route path="/dashboard" component={Dashboard} exact/>
                <Redirect to="/dashboard"/>
            </>}
        </Switch>
    </BrowserRouter>;
};
