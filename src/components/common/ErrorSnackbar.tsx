import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import {clearError} from '../../reducers/error';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';


function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const ErrorSnackbar: React.FunctionComponent = ({children}) => {

    const error = useSelector((state: RootState) => state.error);
    const dispatch = useDispatch();

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(clearError());
    };

    return <div>
        <Snackbar
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            key="top,right"
            open={!!error}
            autoHideDuration={6000}
            onClose={handleClose}
        >
            <Alert severity="error" onClose={handleClose}>{error}</Alert>
        </Snackbar>
        {children}
    </div>;
};