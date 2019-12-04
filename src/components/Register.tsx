import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import {Typography} from '@material-ui/core';
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
    buttonText: {
        textTransform: 'capitalize'
    },
    buttonsContainer: {
        marginTop: '12px',
        flexDirection: 'row',
        display: 'flex'
    }
});

interface SignUpProps {

}

export const Register: React.FunctionComponent<SignUpProps> = () => {
    const classes = useStyles();

    let history = useHistory();

    return <div className={classes.container}>
        <form>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                    <img src="/images/logo.png" height="30"/>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Typography variant="h5">Create your Mini Jira Account</Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        className={classes.input}
                        required
                        label="Username"
                        defaultValue=""
                        variant="outlined"
                        fullWidth
                        margin="dense"
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        className={classes.input}
                        required
                        label="Email"
                        defaultValue=""
                        variant="outlined"
                        fullWidth
                        margin="dense"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        className={classes.input}
                        required
                        label="Password"
                        type="password"
                        defaultValue=""
                        variant="outlined"
                        fullWidth
                        margin="dense"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        className={classes.input}
                        label="Repeat password"
                        type="password"
                        required
                        defaultValue=""
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
                        variant="contained"
                        color="primary">
                    Register
                </Button>
            </div>
        </form>
    </div>
};
