import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import {useModalRender} from '../../hooks/useModalRender';
import {CreateTaskModal} from './CreateTaskModal';
import {Board, Task} from '../../types';
import {Typography} from '@material-ui/core';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import withStyles from '@material-ui/core/styles/withStyles';
import {useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import {find} from 'lodash';

const ExpansionPanelSummary = withStyles({
    // root: {
    //     backgroundColor: 'rgba(0, 0, 0, .03)',
    //     borderBottom: '1px solid rgba(0, 0, 0, .125)',
    //     marginBottom: -1,
    //     minHeight: 56,
    //     '&$expanded': {
    //         minHeight: 56,
    //     },
    // },
    // content: {
    //     '&$expanded': {
    //         margin: '12px 0',
    //     },
    // },
    // expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
    root: {
        paddingRight: 0,
        flexDirection: 'column'
    },
}))(MuiExpansionPanelDetails);

const TaskItem: React.FunctionComponent<{ taskId: string; onCreateSubTask: (task?: Task) => void }> = ({taskId, onCreateSubTask}) => {

    // console.log('[obabichev] state', );

    const task: Task | undefined = useSelector((state: RootState) => find(state?.board?.tasks, {_id: taskId}));

    if (!task) {
        return null;
    }

    // const task = useSelector((state: RootState) => state.board.)


    return (
        <ExpansionPanel style={{flex: 1}}>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <Typography>{task.title}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <div>
                    <Button color="primary" onClick={() => onCreateSubTask(task)}>Create subtask</Button>
                </div>
                {task.subtasks.map(taskId => (
                    <TaskItem key={task._id} taskId={taskId} onCreateSubTask={onCreateSubTask}/>
                ))}
                {/*<div>*/}
                {/*    <div>*/}
                {/*        <Typography>*/}
                {/*            {task.description}*/}
                {/*        </Typography>*/}
                {/*        <Button color="primary" onClick={() => onCreateSubTask(task)}>Create subtask</Button>*/}
                {/*    </div>*/}
                {/*    <div>*/}
                {/*        {task.subtasks.map(taskId => (*/}
                {/*            <TaskItem key={task._id} taskId={taskId} onCreateSubTask={onCreateSubTask}/>))}*/}
                {/*    </div>*/}
                {/*</div>*/}
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

export const Backlog: React.FunctionComponent<{ board: Board }> = ({board}) => {
    const [parentTask, setParentTask] = useState<Task | undefined>();

    console.log('[obabichev] parentTask', parentTask);

    const modal = useModalRender();

    return modal(
        <CreateTaskModal boardId={board._id} parentTask={parentTask}/>,
        (_open) => {
            const open = (task?: Task) => {
                setParentTask(task);
                _open();
            };

            return <div>
                <Button color="primary" onClick={() => open()}>Create task</Button>
                {board.tasks
                    .filter(task => !task.parent)
                    .map(task => (<TaskItem key={task._id} taskId={task._id} onCreateSubTask={open}/>))}
            </div>;
        }
    );

    // return <div>
    //     {modal(
    //         <CreateTaskModal boardId={board._id}/>,
    //         (open) => <Button color="primary" onClick={open}>Create task</Button>
    //     )}
    //
    //     {board.tasks.map(task => (<TaskItem key={task._id} task={task}/>))}
    // </div>
};
