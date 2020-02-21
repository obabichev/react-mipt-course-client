import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Dictionary} from '../types';
import {errorThunk} from '../utils/errorThunk';
import {dictionaryService} from '../service/dictionary';

const dictionaries = createSlice({
    name: 'dictionaries',
    initialState: {
        categories: [],
        'board-icons': []
    } as { categories: Dictionary[], 'board-icons': Dictionary[] },
    reducers: {
        setDictionary: ((state, {payload: {name, items}}: PayloadAction<{ name: string, items: Dictionary[] }>) => ({
            ...state,
            [name]: items
        }))
    }
});

export const {setDictionary} = dictionaries.actions;

export const fetchDictionaries = (name: 'categories' | 'board-icons') => errorThunk(
    dispatch => dictionaryService.dictionary(name)
        .then(items => dispatch(setDictionary({name, items})))
);

export default dictionaries.reducer;