import React, {useState} from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import {Typography} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router';
import {useRequestProgress} from '../hooks/useRequestProgress';
import {authService} from '../service/auth';
import {login} from '../App'
import {ProgressWrapper} from './common/ProgressWrapper';


const useStyles = makeStyles({
    page: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '120px',
        width: '440px',
    },
    container: {
        border: '1px solid #dadce0',
        borderRadius: '8px',
        padding: '40px'
    },
    input: {
        fontSize: '14px'
    },
    buttonText: {
        textTransform: 'capitalize'
    },
    buttonsContainer: {
        marginTop: '12px',
        flexDirection: 'row',
        display: 'flex'
    },
    errorContainer: {
        marginBottom: '16px'
    }
});

interface SignUpProps {

}

export const Register: React.FunctionComponent<SignUpProps> = () => {
    const classes = useStyles();

    const [submitRegister, loading, error, onCloseError] = useRequestProgress(authService.register);

    let history = useHistory();

    const [credentials, setCredentials] = useState<{ name: string, email: string, password: string, checkPassword: string }>({
        name: '',
        email: '',
        password: '',
        checkPassword: ''
    });

    const onChange = ({target: {name, value}}: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({...credentials, [name]: value})
    };

    const onSubmit = (event?: React.FormEvent) => {
        if (event) {
            event.preventDefault();
        }

        submitRegister(credentials)
            .then(tokens => tokens && login(tokens));
    };

    return <ProgressWrapper loading={loading}>
        <div className={classes.page}>
            <div className={classes.errorContainer}>
                <ProgressWrapper error={error} onCloseError={onCloseError}/>
            </div>

            <div className={classes.container}>
                <form onSubmit={onSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <img alt="logo" src="/images/logo.png" height="30"/>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Typography variant="h5">Create your Mini Jira Account</Typography>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                className={classes.input}
                                onChange={onChange}
                                value={credentials['name']}
                                name="name"
                                required
                                label="Username"
                                variant="outlined"
                                fullWidth
                                margin="dense"
                            />
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
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
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
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                className={classes.input}
                                onChange={onChange}
                                value={credentials['checkPassword']}
                                name="checkPassword"
                                label="Repeat password"
                                type="password"
                                required
                                variant="outlined"
                                fullWidth
                                margin="dense"
                            />
                        </Grid>
                    </Grid>
                    <div className={classes.buttonsContainer}>
                        <Button classes={{text: classes.buttonText}}
                                color="primary"
                                onClick={() => history.push('/login')}>
                            Sign in instead
                        </Button>
                        <div style={{flex: 1}}/>
                        <Button classes={{contained: classes.buttonText}}
                                onClick={onSubmit}
                                variant="contained"
                                color="primary">
                            Register
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </ProgressWrapper>;
};
