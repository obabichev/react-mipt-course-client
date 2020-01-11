import React from 'react';
import {Board} from '../../types';
import {Table} from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import {UserIcon} from './UserIcon';

interface ProjectsTableProps {
    boards: Board[]
}

export const BoardsTable: React.FunctionComponent<ProjectsTableProps> = ({boards}) => {
    console.log('[obabichev] boards', boards);

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
            {boards.map(board => (<TableRow key={board.__id}>
                <TableCell align="left">
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <div>
                            <img width={24} height={24} src="/project-icons/1.svg"/>
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
                            <UserIcon name={board.owner && board.owner.name || ''}/>
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

