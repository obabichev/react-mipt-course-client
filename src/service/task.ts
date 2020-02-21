import {Task} from '../types';
import {wrapFetch} from '../utils/wrapFetch';
import {authFetch} from '../App';

const postTask = (task: Partial<Task> & { boardId: string, parentTaskId?: string }) => {
    return wrapFetch(authFetch)('/task', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(task)
    })
};

export const taskService = {
    postTask
};