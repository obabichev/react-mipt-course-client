import {useDispatch} from 'react-redux';
import {RootState} from '../reducers';
import {Action} from 'redux';
import {ThunkDispatch} from 'redux-thunk';

export const useDispatchThunk = () => {
    return useDispatch<ThunkDispatch<RootState, undefined, Action>>()
};
