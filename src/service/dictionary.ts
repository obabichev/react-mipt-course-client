import {wrapFetch} from '../utils/wrapFetch';

const dictionary = (name: string) => {
    return wrapFetch(fetch)(`/dictionaries/${name}`);
};

export const dictionaryService = {
    dictionary
};