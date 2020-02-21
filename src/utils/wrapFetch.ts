import {ValidationError} from './ValidationError';

export const wrapFetch = (_fetch: typeof fetch) => {
    return async (...args: Parameters<typeof fetch>) => {

        const response = await _fetch(...args);

        const data = await response.json();

        if (response.status === 200) {
            return data;
        }

        if (data.validation) {
            throw new ValidationError(data);
        }

        throw new Error(data.message || 'Error message was not specified');
    }
};
