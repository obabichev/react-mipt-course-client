import React from 'react';
import Button from '@material-ui/core/Button';
import {useModalRender} from '../../hooks/useModalRender';
import {Board, Task} from '../../types';
import {Typography} from '@material-ui/core';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import withStyles from '@material-ui/core/styles/withStyles';
import {useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {useHistory} from 'react-router';
import {CREATE_TASK_MODAL} from '../../reducers/modal';

const ExpansionPanelSummary = withStyles({
    root: {
        "&:hover": {
            backgroundColor: "#EBECF0"
        }
    }
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
    root: {
        paddingRight: 0,
        flexDirection: 'column'
    },
}))(MuiExpansionPanelDetails);

const useStyles = makeStyles({
    link: {
        color: 'rgb(107, 119, 140)',
        marginRight: '8px',
        "&:hover": {
            textDecoration: 'underline',
            color: 'rgb(137, 147, 164)'
        }
    }
});

const TaskItem: React.FunctionComponent<{ taskId: string; onCreateSubTask: (task?: Task) => void }> = ({taskId, onCreateSubTask}) => {
    const classes = useStyles();

    const history = useHistory();

    const task: Task | undefined = useSelector((state: RootState) => state.board?.tasks[taskId]);

    if (!task) {
        return null;
    }

    // const task = useSelector((state: RootState) => state.board.)

    const onClickLink = (event: React.MouseEvent) => {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }

        history.push(`/task/${task.key}`);
    };

    return (
        <ExpansionPanel style={{flex: 1}}>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <a onClick={onClickLink} className={classes.link}>
                    <Typography>{task.key}</Typography>
                </a>
                <Typography>{task.title}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <div>
                    <Button color="primary" onClick={() => onCreateSubTask(task)}>Create subtask</Button>
                </div>
                {task.subtasks.map(taskId => (
                    <TaskItem key={taskId} taskId={taskId} onCreateSubTask={onCreateSubTask}/>
                ))}
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

export const TasksList: React.FunctionComponent<{ board: Board }> = ({board}) => {
    const modal = useModalRender(CREATE_TASK_MODAL);

    return modal(
        (open) => (<div>
            <Button color="primary" onClick={() => open({boardId: board._id})}>Create task</Button>
            {board.tasks
                .map(taskId => (
                    <TaskItem key={taskId} taskId={taskId}
                              onCreateSubTask={(parentTask) => open({boardId: board._id, parentTask})}/>
                ))}
        </div>)
    );
};
