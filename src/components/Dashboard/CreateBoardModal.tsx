import React from 'react';
import {createStyles, Modal, Theme, Typography} from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const categories = [
    {
        title: 'A',
        value: 10
    },
    {
        title: 'B',
        value: 20
    },
    {
        title: 'C',
        value: 30
    }
];

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
        },
        input: {
            fontSize: '14px'
        },
    }),
);

interface CreateBoardModalProps {
    open: boolean
    onClose: () => void
}

export const CreateBoardModal: React.FunctionComponent<CreateBoardModalProps> = ({open, onClose}) => {
    const classes = useStyles();

    return <Modal open={open} onClose={onClose} className={classes.modal}>
        <Paper className={classes.paper}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                    <Typography variant="h5">Create Board</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        className={classes.input}
                        onChange={() => null}
                        value={'Fixed'}
                        name="title"
                        required
                        label="Title"
                        variant="outlined"
                        fullWidth
                        margin="dense"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        className={classes.input}
                        onChange={() => null}
                        value={'KEY'}
                        name="key"
                        required
                        label="Key"
                        variant="outlined"
                        fullWidth
                        margin="dense"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={10}
                        onChange={() => null}
                        fullWidth
                    >
                        {categories.map((category) => (
                            <MenuItem key={category.value} value={category.value}>
                                {category.title}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                </Grid>
                <Grid item xs={12} sm={9}>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Button variant="contained"
                            color="primary">
                        Create
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    </Modal>;
};
