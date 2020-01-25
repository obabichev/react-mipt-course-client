import React from 'react';
import {createStyles, LinearProgress, Theme} from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';

interface IProgressWrapper {
    loading?: boolean | null;
    error?: string | null;
    onCloseError?: () => void;
}

const useStyles = makeStyles(() =>
    createStyles({
        errorContainer: {
            backgroundColor: '#ffdce0',
            color: '#86181d',
            borderRadius: '5px',
            padding: '15px 20px',
            paddingRight: '5px',
            border: '1px solid',
            borderColor: 'rgba(27,31,35,.15)',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
        }
    }),
);

export const ProgressWrapper: React.FunctionComponent<IProgressWrapper> = ({children, loading, error, onCloseError}) => {
    const classes = useStyles();
    return <>
        {error && <div className={classes.errorContainer}>
            <div>{error}</div>
            <div style={{flex: 1}}/>
            {onCloseError && <div>
                <Button color="secondary" onClick={onCloseError}><CloseIcon fontSize='small'/></Button>
            </div>}
        </div>
        }
        {loading && <div style={{width: '100%'}}>
            <LinearProgress/>
        </div>}
        {children}
    </>
};