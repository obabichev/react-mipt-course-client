import React from 'react';
import {Redirect, RouteProps} from 'react-router';
import {splitParams} from '../../utils/splitParams';
import {authService} from '../../service/auth';
import {login} from '../../App';
import {LinearProgress} from '@material-ui/core';

export class Google extends React.Component<RouteProps, { failed: boolean }> {

    constructor(props: any) {
        super(props);
        this.state = {
            failed: false
        }
    }

    componentDidMount(): void {
        const hash = this?.props?.location?.hash || '';

        const params = splitParams(hash.slice(1));

        if (params['id_token']) {
            authService.loginByGoogleIdToken(params['id_token'])
                .then(tokens => {
                    login(tokens);
                })
                .catch(error => {
                    console.error(error);
                    this.setState({failed: true})
                })
        } else {
            this.setState({failed: true});
        }
    }

    render() {
        if (this.state.failed) {
            return <Redirect to="/login"/>
        }
        return (
            <div style={{width: '100%'}}>
                <LinearProgress/>
            </div>
        );
    }
}
