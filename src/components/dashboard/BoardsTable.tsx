import React from 'react';
import {Board} from '../../types';
import {Table, Theme} from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import {UserIcon} from './UserIcon';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {useHistory} from 'react-router';

interface ProjectsTableProps {
    boards: Board[]
}

const useStyles = makeStyles({
    tableRow: {
        "&:hover": {
            backgroundColor: "#EBECF0"
        }
    },
    hover: {}
});

export const BoardsTable: React.FunctionComponent<ProjectsTableProps> = ({boards}) => {
    const classes = useStyles();
    const history = useHistory();

    const onClickRow = (key: string) => () => {
        history.push(`/board/${key}`);
    };

    return <Table>
        <TableHead>
            <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="left">Key</TableCell>
                <TableCell align="left">Owner</TableCell>
                <TableCell align="left">Category</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {boards.map(board => (
                <TableRow key={board._id} className={classes.tableRow} onClick={onClickRow(board.key)}>
                    <TableCell align="left">
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <div style={{width: 24, height: 24}}>
                                {board?.icon?.value &&
                                <img alt="project-icon" width={24} height={24} src={board.icon.value}/>}
                            </div>
                            <div style={{marginLeft: 5}}>
                                {board.title}
                            </div>
                        </div>
                    </TableCell>
                    <TableCell align="left">{board.key}</TableCell>
                    <TableCell align="left">
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <div>
                                <UserIcon name={board?.owner?.name || ''}/>
                            </div>
                            <div style={{marginLeft: 5}}>
                                {board.owner && board.owner.name}
                            </div>
                        </div>
                    </TableCell>
                    <TableCell align="left">{board.category && board.category.value}</TableCell>
                </TableRow>))}
        </TableBody>
    </Table>
};

