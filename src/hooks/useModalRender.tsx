import React, {ReactElement, useState} from 'react';
import {createStyles, Modal, Theme} from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing(2),
            width: '400px',
            outline: 'none'
        }
    }),
);

export const useModalRender = () => {
    const [open, setOpen] = useState(false);

    const classes = useStyles();

    const render = (renderElement: ReactElement, renderActivator: (open: () => void) => ReactElement): ReactElement => {
        return <>
            <Modal open={open} onClose={() => setOpen(false)} className={classes.modal}>
                <Paper className={classes.paper}>
                    {renderElement}
                </Paper>
            </Modal>
            {renderActivator(() => setOpen(true))}
        </>
    };

    return render;
};