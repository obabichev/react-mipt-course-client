import {useState} from 'react';

export const useRequestProgress = <T extends Array<any>, U>(fn: (...args: T) => Promise<U>) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);

    const _callback = async (...args: T) => {
        setLoading(true);
        setError(null);

        try {
            await new Promise((r) => setTimeout(r, 2000));
            return await fn(...args);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    const onCloseError = () => setError(null);

    return [_callback, loading, error, onCloseError] as
        [typeof _callback, typeof loading, typeof error, typeof onCloseError];
};
