import React from 'react';
import Button from '@material-ui/core/Button';
import {useModalRender} from '../../hooks/useModalRender';
import {CreateTaskModal} from './CreateTaskModal';

export const Backlog = () => {

    const modal = useModalRender();

    return <div>
        {modal(
            <CreateTaskModal/>,
            (open) => <Button color="primary" onClick={open}>Create task</Button>
        )}
    </div>
};
