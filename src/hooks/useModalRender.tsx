import React, {ReactElement} from 'react';
import {createStyles, Modal, Theme} from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Paper from '@material-ui/core/Paper';
import {CREATE_BOARD_MODAL, closeModal, openModal, CREATE_TASK_MODAL} from '../reducers/modal';
import {CreateBoardModal} from '../components/dashboard/CreateBoardModal';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../reducers';
import {CreateTaskModal} from '../components/board/CreateTaskModal';


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

export const useModalRender = (name: string) => {
    // const [open, setOpen] = useState(false);

    const modalData = useSelector((state: RootState) => state.modal[name]);

    const dispatch = useDispatch();

    const isOpen = !!modalData;

    const classes = useStyles();

    let Component: null | React.FunctionComponent<any> = null;
    switch (name) {
        case CREATE_BOARD_MODAL:
            Component = CreateBoardModal;
            break;
        case CREATE_TASK_MODAL:
            Component = CreateTaskModal;
            break;
    }

    const open = (props: any) => {
        dispatch(openModal({name, props}));
    };

    const close = () => {
        dispatch(closeModal(name));
    };

    const render = (renderActivator: (open: (props?: any) => void) => ReactElement): ReactElement => {
        return <>
            <Modal open={isOpen} onClose={close} className={classes.modal}>
                <Paper className={classes.paper}>
                    {Component && <Component {...modalData?.props}/>}
                </Paper>
            </Modal>
            {renderActivator(open)}
        </>
    };

    return render;
};