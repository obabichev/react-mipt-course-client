import React from 'react';
import {RouteComponentProps} from 'react-router';
import {useBoard} from '../../hooks/useBoard';
import {TasksList} from './TasksList';
import PageContainer from '../common/PageContainer';
import {Breadcrumb} from '../common/Breadcrumb';
import {Typography} from '@material-ui/core';
import {UserIcon} from '../dashboard/UserIcon';
import {useLoading} from '../../hooks/useLoading';
import {BOARD_LOADING, BOARDS_LIST_LOADING} from '../../reducers/loading';

export const BoardPage: React.FunctionComponent<RouteComponentProps<{ id?: string }>> = (props) => {
    const id = props.match.params.id;
    const isLoading = useLoading([BOARD_LOADING]);

    console.log('[obabichev] isLoading', isLoading);

    const [board] = useBoard(id);

    console.log('[obabichev] board', board);

    return <PageContainer loading={isLoading}>
        {board && <>
            <Breadcrumb paths={[{title: 'Boards', path: '/'}, {title: board.key, path: `/board/${board.key}`}]}/>
            <div style={{marginTop: '4px', display: 'flex', flexDirection: 'row'}}>
                <div>
                    <div style={{width: 24, height: 24, display: 'inline'}}>
                        {board?.icon?.value &&
                        <img alt="project-icon" width={24} height={24} src={board.icon.value}/>}
                    </div>
                    <Typography variant="h4" display="inline">
                        {board.title}
                    </Typography>
                    <Typography>{board?.category?.value}</Typography>
                </div>
                <div style={{flex: 1}}/>
                <div>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <div style={{color: 'gray', fontSize: '14px', marginRight: '5px'}}>
                            Created by:
                        </div>
                        <div>
                            <UserIcon name={board?.owner?.name || ''}/>
                        </div>
                        <div style={{marginLeft: 5}}>
                            {board.owner && board.owner.name}
                        </div>
                    </div>
                </div>
            </div>
            <TasksList board={board}/>
        </>}
    </PageContainer>
};
