import React, {ChangeEvent, useState} from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {createStyles, Theme, Typography} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

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


interface CreateTaskModalProps {
}

export const CreateTaskModal: React.FunctionComponent<CreateTaskModalProps> = () => {
    const [task, setTask] = useState({
        title: '',
        description: ''
    });

    const onChange = ({target: {name, value}}: ChangeEvent<{ name: string, value: string }>) => {
        setTask({...task, [name]: value});
    };

    return <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
            <Typography variant="h5">Create Task</Typography>
        </Grid>
        <Grid item xs={12} sm={12}>
            <TextField label="Summary"
                       name="title"
                       value={task.title}
                       onChange={onChange}
                       variant="outlined"
                       fullWidth/>
        </Grid>
        <Grid item xs={12} sm={12}>
            <TextField
                label="Description"
                name="description"
                value={task.description}
                onChange={onChange}
                multiline
                fullWidth/>
        </Grid>
    </Grid>;
};
