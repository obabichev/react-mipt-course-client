import React, {useEffect} from 'react';
import {
    BrowserRouter,
    Switch,
    Route, Redirect,
} from 'react-router-dom';
import {Register} from './Register';
import {Login} from './Login';
import {Dashboard} from './Dashboard/Dashboard';
import {RootState} from '../reducers';
import {useDispatch, useSelector} from 'react-redux';
import {loginAction} from '../reducers/auth';

interface RouterProps {

}

export const Router: React.FunctionComponent<RouterProps> = () => {
    const isLoggedIn = useSelector((state: RootState) => {
        return state.auth.isLoggedIn;
    });

    const dispatch = useDispatch();

    useEffect(() => {
        const tokensJson = localStorage.getItem('AUTH_TOKENS');
        if (tokensJson) {
            const tokens = JSON.parse(tokensJson);
            dispatch(loginAction(tokens.user));
        }
    }, []);

    return <BrowserRouter>
        <Switch>
            {!isLoggedIn && <>
                <Route path="/register" component={Register}/>
                <Route path="/login" component={Login}/>
                <Redirect to="/login"/>
            </>}
            {isLoggedIn && <>
                <Route path="/dashboard" component={Dashboard} exact/>
                <Redirect to="/dashboard"/>
            </>}
        </Switch>
    </BrowserRouter>;
};
