import React, {ChangeEvent, useState} from 'react';
import {Typography} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {useDispatch} from 'react-redux';
import {createTask} from '../../reducers/board';
import {Task} from '../../types';

interface CreateTaskModalProps {
    boardId: string,
    parentTask?: Task
}

export const CreateTaskModal: React.FunctionComponent<CreateTaskModalProps> = ({boardId, parentTask}) => {
    console.log('[obabichev] parentTask', parentTask);
    const [task, setTask] = useState({
        title: '',
        description: ''
    });

    const dispatch = useDispatch();

    const onChange = ({target: {name, value}}: ChangeEvent<{ name: string, value: string }>) => {
        setTask({...task, [name]: value});
    };

    const onSubmit = () => {
        dispatch(createTask({...task, boardId, parentTaskId: parentTask?._id || undefined}));
    };

    return <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
            <Typography variant="h5">Create Task</Typography>
        </Grid>
        {parentTask && <Grid item xs={12} sm={12}>
            <Typography variant="h5">Subtask for {parentTask.title}</Typography>
        </Grid>}
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
        <Grid item xs={12} sm={12}>
            <Button color="primary"
                    onClick={onSubmit}
                    disabled={task.title.length < 2}>
                Create
            </Button>
        </Grid>
    </Grid>;
};
