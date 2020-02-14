import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route, Redirect,
} from 'react-router-dom';
import {Register} from './auth/Register';
import {Login} from './auth/Login';
import {DashboardPage} from './dashboard/DashboardPage';
import {useAuth} from '../App';
import {Google} from './auth/Google';
import {BoardPage} from './board/BoardPage';
import {TaskPage} from './board/TaskPage';

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
            <Route path="/dashboard" component={DashboardPage} exact/>
            <Route path="/board/:id" component={BoardPage} exact/>
            <Route path="/task/:key" component={TaskPage} exact/>
            <Redirect to="/dashboard"/>
        </Switch>}
    </BrowserRouter>;
};
