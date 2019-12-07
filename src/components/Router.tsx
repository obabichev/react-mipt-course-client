import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route, Redirect,
} from 'react-router-dom';
import {Register} from './Register';
import {Login} from './Login';
import {Dashboard} from './Dashboard';
import {useAuthContext} from './AuthProvider';

interface RouterProps {

}

export const Router: React.FunctionComponent<RouterProps> = () => {
    const {isLoggedIn} = useAuthContext();

    return <BrowserRouter>
        <Switch>
            {!isLoggedIn() && <>
                <Route path="/register" component={Register}/>
                <Route path="/login" component={Login}/>
                <Redirect to="/login"/>
            </>}
            {isLoggedIn() && <>
                <Route path="/dashboard" component={Dashboard} exact/>
                <Redirect to="/dashboard"/>
            </>}
        </Switch>
    </BrowserRouter>;
};
