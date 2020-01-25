import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {Typography} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router';
import {useDispatch} from 'react-redux';
import {loginThunk} from '../reducers/auth';
import {RedirectGoogleAuth} from './RedirectGoogleAuth';

const useStyles = makeStyles({
    container: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '120px',
        border: '1px solid #dadce0',
        borderRadius: '8px',
        width: '360px',
        padding: '40px'
    },
    input: {
        fontSize: '14px'
    },
    header: {
        textAlign: 'center'
    },
    buttonText: {
        textTransform: 'capitalize',
    },
    buttonsContainer: {
        marginTop: '12px',
        flexDirection: 'row',
        display: 'flex'
    },
    googleAuthContainer: {
        marginTop: '32px',
    }
});

interface LoginProps {
}

export const Login: React.FunctionComponent<LoginProps> = () => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const [credentials, setCredentials] = useState<{ email: string, password: string }>({
        email: '',
        password: '',
    });

    let history = useHistory();

    const onSubmit = (event?: React.FormEvent) => {
        if (event) {
            event.preventDefault();
        }

        dispatch(loginThunk(credentials));
    };

    const onChange = ({target: {name, value}}: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({...credentials, [name]: value})
    };

    return <div className={classes.container}>
        <form onSubmit={onSubmit}>
            <Grid container spacing={2}>
                <Grid className={classes.header} item xs={12} sm={12}>
                    <img alt="logo" src="/images/logo.png" height="30"/>
                </Grid>
                <Grid className={classes.header} item xs={12} sm={12}>
                    <Typography variant="h5">Sign in</Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        className={classes.input}
                        onChange={onChange}
                        value={credentials['email']}
                        name="email"
                        required
                        label="Email"
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        className={classes.input}
                        onChange={onChange}
                        value={credentials['password']}
                        name="password"
                        required
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
            </Grid>
            <div className={classes.buttonsContainer}>
                <Button classes={{text: classes.buttonText}}
                        color="primary"
                        onClick={() => history.push('/register')}>
                    Create account
                </Button>
                <div style={{flex: 1}}/>
                <Button classes={{contained: classes.buttonText}}
                        onClick={onSubmit}
                        variant="contained"
                        color="primary">
                    Sign in
                </Button>
            </div>
            <div className={classes.googleAuthContainer}>
                <RedirectGoogleAuth/>
            </div>
        </form>
    </div>;
};
