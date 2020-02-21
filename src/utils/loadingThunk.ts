import {RootState} from '../reducers';
import {Action} from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {BOARDS_LIST_LOADING, finishLoading, startLoading} from '../reducers/loading';

export const loadingThunk = (loadingKey: string) => <R>(action: ThunkAction<Promise<R>, RootState, undefined, Action>): ThunkAction<Promise<R | undefined>, RootState, undefined, Action> =>
    async (dispatch: ThunkDispatch<RootState, undefined, Action>) => {
        dispatch(startLoading(BOARDS_LIST_LOADING));
        try {
            return await dispatch(action);
        } finally {
            dispatch(finishLoading(BOARDS_LIST_LOADING));
        }
    };

