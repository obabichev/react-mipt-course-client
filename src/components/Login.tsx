import React from 'react';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {Typography} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router';

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
    }
});

interface LoginProps {
}

export const Login: React.FunctionComponent<LoginProps> = () => {
    const classes = useStyles();

    let history = useHistory();

    return <div className={classes.container}>
        <form>
            <Grid container spacing={2}>
                <Grid className={classes.header} item xs={12} sm={12}>
                    <img src="/images/logo.png" height="30"/>
                </Grid>
                <Grid className={classes.header} item xs={12} sm={12}>
                    <Typography variant="h5">Sign in</Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        className={classes.input}
                        required
                        label="Email"
                        defaultValue=""
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        className={classes.input}
                        required
                        label="Password"
                        type="password"
                        defaultValue=""
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
                        variant="contained"
                        color="primary">
                    Sign in
                </Button>
            </div>
        </form>
    </div>;
};
