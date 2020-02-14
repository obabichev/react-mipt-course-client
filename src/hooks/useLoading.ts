import {useSelector} from 'react-redux';
import {RootState} from '../reducers';
import {useMemo} from 'react';
import {compact} from 'lodash';

export const useLoading = (loadingKeys: string[]) => {
    const loading = useSelector((state: RootState) => state.loading);

    return useMemo(() => {
        return compact(loadingKeys.map(key => loading[key])).length !== 0;
    }, [loading, loadingKeys]);
};