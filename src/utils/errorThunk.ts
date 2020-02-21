import {Action} from 'redux';
import {RootState} from '../reducers';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {ValidationError} from './ValidationError';
import {setError} from '../reducers/error';

export const errorThunk = <R>(action: ThunkAction<Promise<R>, RootState, undefined, Action>): ThunkAction<Promise<R | undefined>, RootState, undefined, Action> =>
    async (dispatch: ThunkDispatch<RootState, undefined, Action>) => {
        try {
            return await dispatch(action);
        } catch (e) {
            if (e instanceof ValidationError) {
                throw e;
            }
            dispatch(setError(e.message));
        }
    };
